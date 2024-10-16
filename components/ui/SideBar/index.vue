<template>
  <div class="SideBar" :class="sideBarClasses">
    <div class="SideBar__persistent-content">
      <div class="SideBar-logo">
        <img class="SideBar-logo-image" src="@/assets/images/logo.png" alt="2Board">
        <div class="SideBar-logo-text">2Board</div>
      </div>
      <div class="SideBar__footer">
        <div class="SideBar__hue-sat-picker-container"
        :class="{
          'SideBar__hue-sat-picker-container--hidden': !isHueSatPickerOpen && !isHueSatPickerHovered,
        }"
        >
        <TwoHueSatPicker
        class="SideBar__hue-sat-picker"
        @unfocus="() => toggleHueSatPicker()"
        @mouseover="() => setHueSatHoverState(true)"
        @mouseleave="() => setHueSatHoverState(false)"
        />
      </div>
      <div class="SideBar__footer-icons">
        <span class="SideBar__extra-buttons">
          <TwoButton
          class="SideBar__footer-button"
          icon="fa-solid fa-brush"
          :variant="!isHueSatPickerOpen ? 'ghost' : ''"
          @click="() => toggleHueSatPicker()"
          @mouseover="() => setHueSatHoverState(true)"
          @mouseleave="() => setHueSatHoverState(false)"
          />
          <SchemeToggle class="SideBar__scheme-toggle" />
        </span>
        <TwoButton
        class="SideBar__footer-button"
        icon="fa-solid fa-mattress-pillow"
        :variant="!isLocked ? 'ghost' : ''"
        @click="toggleLock"
        />
      </div>
    </div>
  </div>  
  <div class="SideBar__actual-content">
    <div class="SideBar-menu">
      <Routes @click="handleClick" />
    </div>
  </div>
  <div class="SideBar__underlay" />
</div>
</template>

<script setup lang="ts">    
import TwoHueSatPicker from '@ui/TwoHueSatPicker.vue';
import TwoButton from '@ui/TwoButton.vue';
import SchemeToggle from '@ui/SideBar/SchemeToggle.vue';
import Routes from '@ui/SideBar/Routes.vue';
import { useMediaQuery } from '@utils/extensions/dom';
import { asyncTimeout } from '@utils/extensions/timeout';

const isLocked = useCookie<boolean>('isLocked', { 
  default: () => false,
});

const isHueSatPickerOpen = ref<boolean>(false);
const isHueSatPickerHovered = ref<boolean>(false);
const setHueSatHoverState = (isHovered: boolean) => {
  isHueSatPickerHovered.value = isHovered;
};

const toggleHueSatPicker = async () => {
  isHueSatPickerOpen.value = !isHueSatPickerOpen.value;
  await asyncTimeout(2000);
  isHueSatPickerOpen.value = false;
};

const emit = defineEmits<{
  (event: 'update:isLocked', value: boolean): void;
}>();

const { matches: isMobile } = useMediaQuery('mobile');

watch([isLocked, isMobile], ([newVal]) => {
  const parentNeedsPadding = !isMobile.value && newVal;
  emit('update:isLocked', parentNeedsPadding);
});

const toggleLock = () => {
  isLocked.value = !isLocked.value;
};

const handleClick = () => {
  if (isMobile.value) {
    toggleLock();
  }
};

const sideBarClasses = computed<string[]>(() => {
  const classNames: string[] = [];
  if (isLocked.value) {
    if (!isMobile.value) {
      classNames.push('SideBar--open-and-locked');
    } else {
      classNames.push('SideBar--open');
    }
  }
  return classNames;
});
</script>

<style scoped lang="scss">
$default-padding-mobile: 10px;
$default-padding: 15px;
$header-padding: 90px;

$inner-width: 300px;
$inner-width-mobile: calc(100dvw - $default-padding-mobile * 2);

/**
* This is the state of the sidebar when it's open but not locked to the screen.
* It's also used for displaying the sidebar on mobile devices.
*/
@mixin openSideBar {
  width: $inner-width-mobile;
  pointer-events: auto;
  @media (min-width: 768px) {
    width: $inner-width;
  }
  .SideBar__actual-content, .SideBar__underlay {
    width: $inner-width-mobile;
    opacity: 1;
    pointer-events: auto;
    @media (min-width: 768px) {
      width: $inner-width;
    }
  }
  .SideBar__persistent-content {
    padding: 0 $default-padding-mobile;
    width: calc($inner-width-mobile - $default-padding-mobile * 3);
    @media (min-width: 768px) {
      top: $default-padding;
      left: $default-padding;
      bottom: $default-padding;
      width: calc($inner-width - $default-padding * 2);
    }
  }
  .SideBar__hue-sat-picker-container {
    opacity: 1;
    max-width: 100%;
    @media (min-width: 768px) {
      display: block;
    }
  }
  .SideBar__scheme-toggle, .SideBar__footer-button--hue-sat-toggle {
    display: block;
    opacity: 1;
    right: $default-padding-mobile;
    @media (min-width: 768px) {
      right: unset;
    }
  }
  .SideBar__extra-buttons {
    opacity: 1;
    pointer-events: auto;
  }
  .SideBar__footer-icons {
    justify-content: space-between;
    flex-direction: row;
    @media (min-width: 768px) {
      flex-direction: row-reverse;
      width: calc($inner-width - ($default-padding * 2 + 15px));
    }
  }
  .SideBar-logo {
    opacity: 0;
    @media (min-width: 768px) {
      opacity: 0.5;
    }
  }
}

/**
* This is the state of the sidebar when it's open and locked to the screen.
* This will never be used on mobile devices.
*/
@mixin openAndLockedSideBar {
  .SideBar__underlay {
    box-shadow: none;
    border-radius: 0 var(--tb-border-radius) var(--tb-border-radius) 0;
    height: calc(100%);
    top: 0;
    left: 0;
  }
  .SideBar__actual-content {
    margin-left: 0;
  }
  .SideBar__hue-sat-picker-container {
    max-width: 100%;
    display: block;
    opacity: 1;
  }
  .SideBar__persistent-content {
    padding: 0 $default-padding-mobile;
    width: calc($inner-width-mobile - $default-padding-mobile * 2);
    @media (min-width: 768px) {
      width: calc($inner-width - $default-padding * 2 - 15px);
    }
  }
}

.SideBar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 0px;
  gap: $default-padding-mobile * 2;
  position: absolute;
  overflow: visible;
  z-index: 1;
  transition: all var(--transition-speed) ease-in-out;  
  background-color: var(--background-color);
  @media (min-width: 768px) { 
    pointer-events: none;
    position: relative;
  }
  &:hover {
    pointer-events: auto;
    @media (min-width: 768px) {
      @include openSideBar;
      &:after {
        pointer-events: none;
      }
    }
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: auto;
    @media (min-width: 768px) {
      width: 60px;
      height: 100%;
    }
  }
}

.SideBar--open {
  @include openSideBar;
  &:after {
    pointer-events: none;
  }
}

.SideBar--open-and-locked {
  @include openSideBar;
  @include openAndLockedSideBar;
  &:hover {
    @include openAndLockedSideBar;
  }
  &:after {
    pointer-events: none;
  }
}

.SideBar__underlay {
  position: absolute;
  z-index: -1;
  top: $default-padding-mobile;
  opacity: 0;
  left: $default-padding-mobile;
  width: 0px;
  box-shadow: var(--side-bar-shadow);
  height: calc(100% - $default-padding-mobile * 2);
  overflow: visible;
  transition: all var(--transition-speed) ease-in-out;
  border-radius: var(--tb-border-radius);
  background-color: var(--side-bar-bg);
  outline: 2px solid var(--side-bar-outline);
}

.SideBar__actual-content {
  display: flex;
  transition: all var(--transition-speed) ease-in-out;
  opacity: 0;
  flex-direction: column;
  flex-grow: 1;
  gap: $default-padding-mobile;
  margin: 0;
  margin-left: $default-padding-mobile;
  width: 0px;
  height: calc(100% - $header-padding);
  padding: $header-padding 0 0 0;
  overflow: hidden;
  pointer-events: auto;
  @media (min-width: 768px) {
    pointer-events: none;
  }
}

.SideBar__persistent-content {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: absolute;
  top: $default-padding-mobile;
  left: $default-padding-mobile;
  padding: 0 calc($default-padding-mobile / 2);
  width: calc($inner-width-mobile - $default-padding-mobile);
  transition: all var(--transition-speed) ease-in-out;
  @media (min-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: calc($inner-width - $default-padding * 2);
    top: $default-padding;
    left: $default-padding;
    bottom: $default-padding;
    right: $default-padding;
  }
}

.SideBar-logo {
  font-size: 20px;
  font-weight: 500;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  gap: $default-padding-mobile;
  margin: $default-padding-mobile 0 $default-padding;
  width: 100%;
  opacity: 0.3;
  filter: var(--logo-filter);
  -webkit-filter: var(--logo-filter);
  transition: all var(--transition-speed) ease-in-out;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}

.SideBar-logo-text {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #000000;
  text-transform: uppercase;
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
}

.SideBar-logo-image {
  width: 50px;
  height: 50px;
}

.SideBar-menu {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: $default-padding-mobile;
  margin: 0 $default-padding-mobile 0;
  width: calc($inner-width-mobile - $default-padding-mobile * 2);
  @media (min-width: 768px) {
    margin: 0 $default-padding 0;
    width: calc($inner-width - 25px);
  }
}

.SideBar__hue-sat-picker-container {
  position: absolute;
  bottom: calc(-100dvh + $header-padding + $default-padding);
  left: $default-padding-mobile;
  right: $default-padding-mobile;
  transition: all var(--transition-speed) ease-in-out;
  opacity: 0;
  max-width: 0%;
  overflow: hidden;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);
  border-radius: var(--tb-border-radius);
  @media (min-width: 768px) {
    display: block;
    position: relative;
    bottom: unset;
    left: unset;
    right: unset;
    width: 100%;
    opacity: 1;
  }
}

.SideBar__hue-sat-picker-container--hidden {
  display: none;
  opacity: 0 !important;
  pointer-events: none !important;
  &:hover {
    opacity: 1 !important;
  }
}

.SideBar__footer {
  display: flex;
  flex-direction: column;
  gap: $default-padding-mobile;
  transition: all var(--transition-speed) ease-in-out;
  width: calc($inner-width-mobile - $default-padding-mobile * 2);
  @media (min-width: 768px) {
    width: calc($inner-width - ($default-padding * 2 + 15px));
  }
  &:hover {
    pointer-events: auto;
  }
}

.SideBar__footer-icons {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  gap: $default-padding-mobile;
  transition: all var(--transition-speed) ease-in-out;
  padding: $default-padding-mobile 0;
  @media (min-width: 768px) {
    width: calc($inner-width - ($default-padding * 2 + 15px));
  }
}

.SideBar__extra-buttons {
  display: flex;
  opacity: 0;
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  transition: all var(--transition-speed) ease-in-out;
  pointer-events: none;
  flex-wrap: nowrap;
  gap: $default-padding-mobile;
  width: calc($inner-width-mobile - $default-padding-mobile * 2 - 60px);
  left: 60px;
  @media (min-width: 768px) {
    display: flex;
    position: relative;
    opacity: 0;
    left: unset;
    width: 100%;
  }
}
</style>