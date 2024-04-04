type ButtonsData = {
  title: string;
  number: number
};

export const buttonsData = (): Array<ButtonsData> => {
  const buttonsDataArray = [
    {
      title: 'Active',
      number: 1,
    },
    {
      title: 'Pending',
      number: 2,
    },
    {
      title: 'Inactive',
      number: 3,
    },

  ];
  return buttonsDataArray;
};
