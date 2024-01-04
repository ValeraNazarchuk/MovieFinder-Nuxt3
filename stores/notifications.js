// core
import { defineStore } from "pinia";
import { ElNotification } from "element-plus";

const timeoutNotify = (message) => {
  setTimeout(() => {
    ElNotification.error({
      title: "Error",
      message,
    });
  }, 5);
};

const notify = (message) => {
  ElNotification.error({
    title: "Error",
    message,
  });
};
export const useNotificationStore = defineStore("notifications", () => {
  const success = (notification) => {
    if (!notification) return;
    ElNotification.success(notification);
  };
  const error = (notification) => {
    if (!notification) return;
    ElNotification.error(notification);
  };
  const failed = (notification) => {
    const error = notification?.data;
    if (error?.violations) {
      const { violations } = error.violations;
      if (violations) {
        violations.forEach((el) => {
          timeoutNotify(el.title);
        });
      } else {
        const errors = Object.keys(error.violations);
        errors.forEach((el) => {
          error.violations[el] &&
            error.violations[el].forEach((el) => {
              timeoutNotify(el);
            });
        });
      }
    } else {
      notify(error?.errorDescription);
    }
  };
  return {
    success,
    error,
    failed,
  };
});
