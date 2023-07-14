import { ref } from "firebase/storage";
import { storage } from "../../../../firebase.config";
import { Save } from "../api";
import { reactive } from "vue";

export const photoStore = reactive({
  uploadedPhoto: null,
  async upload(name = "new-photo", file) {
    const storageRef = ref(storage, name);
    return await Save(storageRef, file);
  },
  applyFilters() {
    if (this.image) {
      const brightness = this.brightness / 100; // Escala de -1 a 1
      const contrast = (this.contrast + 100) / 100; // Escala de 0 a 2

      const brightnessFilter = new fabric.Image.filters.Brightness({
        brightness: brightness,
      });
      const contrastFilter = new fabric.Image.filters.Contrast({
        contrast: contrast,
      });

      this.image.filters = [brightnessFilter, contrastFilter];
      this.image.applyFilters();
      this.canvas.requestRenderAll();
    }
  },
});

export default {
  data() {
    return {
      showCropArea: false,
      cropArea: null,
      selectArea: false,
      newWidth: 0,
      newHeight: 0,
      selectedFilter: false,
    };
  },
  methods: {
    
  },
};
