// core
import { defineStore } from "pinia";

// services
import { api } from "@/services/api";

// stores
import { useNotificationStore } from "@/stores/notifications";

export const useFileStore = defineStore({
  id: "uploadFile",
  actions: {
    async uploadFile(uploadFile) {
      try {
        const formData = new FormData();
        formData.append("file", uploadFile);
        const data = await api("/files", {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
      } catch (error) {
        useNotificationStore().failed(error);
      }
    },
  },
});
