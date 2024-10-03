<template>  
  <div
    class="TwoHueSatPicker"
    ref="container"
    @mousedown="isDragging = true"
    @mouseup="isDragging = false"
    @mouseleave="isDragging = false"
    @click="event"
  >
    <div class="TwoHueSatPicker__saturation" />
    <div class="TwoHueSatPicker__hue" />
    <div class="TwoHueSatPicker__marker-container">
      <div class="TwoHueSatPicker__marker-container-relative">
        <div
          class="TwoHueSatPicker__marker"
          ref="marker"
          @click="(e) => e.stopPropagation()"
        />
        <div class="TwoHueSatPicker__marker-handle">
          <i class="fa-solid fa-circle-dot" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isNullish } from '@utils/extensions';
import { useElementDimensions } from '@utils/extensions/dom';
import { asyncTimeout } from '@utils/extensions/timeout';

const baseHue = useCookie<number>('base-hue', {
    default: () => 203,
});

const baseSaturation = useCookie<number>('base-saturation', {
    default: () => 22,
});

const setColorScheme = (hue: number, saturation: number) => {
  document.documentElement.style.setProperty('--base-hue', hue.toString());
  document.documentElement.style.setProperty('--base-saturation', `${saturation}%`);
};

watch([baseHue, baseSaturation], () => {
  setColorScheme(baseHue.value, baseSaturation.value);
}, { deep: true });

const container = ref<HTMLElement | null>(null);
const marker = ref<HTMLElement | null>(null);
const { height: containerHeight, width: containerWidth } = useElementDimensions(container);
const { height: markerHeight, width: markerWidth } = useElementDimensions(marker);

const getOffsetByHueSaturation = (hue: number, saturation: number) => {
  if (!containerHeight.value || !containerWidth.value) return { x: 0, y: 0 };
  const hueOffset = (hue / 360) * containerWidth.value;
  const saturationOffset = (1 - saturation / 100) * containerHeight.value;
  return {
    x: hueOffset,
    y: saturationOffset,
  };
};

const getHueSaturationByOffset = (x: number, y: number) => {
  if (!containerHeight.value || !containerWidth.value) return { hue: 0, saturation: 0 };
  const hue = Math.max(0, Math.min(360, (x / containerWidth.value) * 360));
  const saturation = Math.max(0, Math.min(100, (1 - y / containerHeight.value) * 100));
  return { hue, saturation };
};

watch([containerHeight, containerWidth, container], () => {
  if (!container.value || !marker.value) return;
  const markerContainerDimensions = getOffsetByHueSaturation(baseHue.value, baseSaturation.value);
  marker.value.style.setProperty('height', `${markerContainerDimensions.y}px`);
  marker.value.style.setProperty('width', `${markerContainerDimensions.x}px`);
}, { immediate: true, deep: true });

const isDragging = ref(false);
watch([markerHeight, markerWidth], ([h, w]) => {
  if (isNullish(w) || isNullish(h)) return;
  if (!isDragging.value) return;
  const { hue, saturation } = getHueSaturationByOffset(w, h);
  baseHue.value = hue;
  baseSaturation.value = saturation;
}, { immediate: true, deep: true });

const event = (e: MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
  const { offsetX, offsetY } = e;
  marker.value?.style.setProperty('width', `${offsetX}px`);
  marker.value?.style.setProperty('height', `${offsetY}px`);
  const { hue, saturation } = getHueSaturationByOffset(offsetX, offsetY);
  baseHue.value = hue;
  baseSaturation.value = saturation;
}
</script>

<style scoped lang="scss">
$hue-gradient: linear-gradient(
  to right, 
  rgb(255, 0, 0), 
  rgb(255, 255, 0),
  rgb(0, 255, 0), 
  rgb(0, 255, 255),
  rgb(0, 0, 255),
  rgb(255, 0, 255),
  rgb(255, 0, 0)
);

$saturation-gradient: linear-gradient(
  to bottom, 
  rgba(0, 0, 0, 0), 
  var(--tb-grey-500)
);

.TwoHueSatPicker {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  opacity: 0.2;
  filter: grayscale(0.4);
  transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out;
  .TwoHueSatPicker__marker-container {
    opacity: 0;
  }
  &:hover {
    opacity: 1;
    filter: grayscale(0);
    .TwoHueSatPicker__marker-container {
      opacity: 1;
    }
  }
}

.TwoHueSatPicker__hue {  
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 200px;
  min-height: 100px;
  background: $hue-gradient;
}

.TwoHueSatPicker__saturation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $saturation-gradient;
}

.TwoHueSatPicker__marker {
  overflow: hidden;
  resize: both;
  max-width: 100%;
  max-height: 100%;
  min-width: 16px;
  min-height: 16px;
  pointer-events: none;
}
.TwoHueSatPicker__marker:after{
  content:"";
  position: absolute;
  bottom: 0;
  right: 0;
  top: unset;
  left: unset;
  display: block;
  width: 16px;
  height: 16px;
  pointer-events: auto;
  cursor: grab;
  z-index: 1;
  opacity: 1;
  background-color: rgba(255,255,255,0)
}

.TwoHueSatPicker__marker-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 17.5px;
  width: 16px;
  font-size: 17px;
  color: var(--tb-grey-800);
  cursor: grab;
  pointer-events: none;
  i {
    box-shadow: 0 0 6px 3px rgba(255, 255, 255, 0.7);
    border-radius: 50%;
  }
}

.TwoHueSatPicker__marker-container {
  transition: opacity var(--transition-speed) ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.TwoHueSatPicker__marker-container-relative {
  position: relative;
  width: fit-content;
  height: fit-content;
  max-width: 100%;
  max-height: 100%;
}
</style>
