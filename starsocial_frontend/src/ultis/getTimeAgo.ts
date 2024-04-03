export const getTimeAgo = (time: any) => {
  // console.log(time);
  if (time) {
    if (new Date().getFullYear() - new Date(time).getFullYear() > 0) {
      return new Date(time).toLocaleDateString();
    } else if (new Date().getMonth() - new Date(time).getMonth() > 0) {
      return new Date().getMonth() - new Date(time).getMonth() + ' month ago';
    } else if (new Date().getDay() - new Date(time).getDay() > 0) {
      return new Date().getDay() - new Date(time).getDay() + ' day ago';
    } else if (new Date().getHours() - new Date(time).getHours() > 0) {
      return new Date().getHours() - new Date(time).getHours() + ' hours ago';
    } else if (new Date().getMinutes() - new Date(time).getMinutes() > 0) {
      return (
        new Date().getMinutes() - new Date(time).getMinutes() + ' minutes ago'
      );
    } else {
      return (
        new Date().getSeconds() - new Date(time).getSeconds() + ' secons ago'
      );
    }
  }
};
