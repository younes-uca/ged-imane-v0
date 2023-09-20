export const MessageService = {

    showToast: (toastRef, options) => {
        if (toastRef && options) {
            toastRef.current?.show(options);
        }
    },

    showSuccess: (toastRef, title: string, message: string) => {
        let options = { severity: 'success', summary: title, detail: message, life: 3000 };
        toastRef.current?.show(options);
    },

    showError: (toastRef, title: string, message: string) => {
        let options = { severity: 'error', summary: title, detail: message, life: 3000 };
        toastRef.current?.show(options);
    }
};
