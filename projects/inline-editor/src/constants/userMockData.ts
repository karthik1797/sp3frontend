export const userDetails = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = {
        userName: 'Brandon',
        email: 'brandon.ware@everlineus.com',
        approver: true,
      };
      resolve(user);
    }, 1000);
  });
};
