export const successMessageCounDown = (secondsToGo, title, modalMessage) => {
    const instance = modalMessage.success({
        title: title,
        content: `Thông báo sẽ đóng ${secondsToGo} giây.`,
    });
    const timer = setInterval(() => {
        secondsToGo -= 1;
        instance.update({
            content: `Thông báo sẽ đóng sau ${secondsToGo} giay.`,
        });
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        instance.destroy();
    }, secondsToGo * 1000);
};
export const errorMessageCounDown = (secondsToGo, title, modalMessage) => {
    const instance = modalMessage.error({
        title: title,
        content: `Thông báo sẽ đóng ${secondsToGo} giây.`,
    });
    const timer = setInterval(() => {
        secondsToGo -= 1;
        instance.update({
            content: `Thông báo sẽ đóng sau ${secondsToGo} giay.`,
        });
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        instance.destroy();
    }, secondsToGo * 1000);
};
