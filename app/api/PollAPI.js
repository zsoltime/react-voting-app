export const setPolls = (polls) => {
  if (Array.isArray(polls)) {
    localStorage.setItem('reactPolls', JSON.stringify(polls));
    return polls;
  }
  return undefined;
};

export const getPolls = () => {
  const strPolls = localStorage.getItem('reactPolls');
  let polls = [];

  try {
    polls = JSON.parse(strPolls);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }

  return Array.isArray(polls) ? polls : [];
};

export const filterPolls = (polls, showFinished, searchText) => (
  polls
    .filter(({ isFinished }) => !isFinished || showFinished)
    .filter(({ title }) => {
      const lowerCaseTitle = title.toLowerCase();
      const lowerCaseSearchText = searchText.toLowerCase();

      return (searchText.length === 0 ||
        lowerCaseTitle.indexOf(lowerCaseSearchText) > -1);
    })
    .sort((a, b) => {
      if (a.isFinished && !b.isFinished) {
        return 1;
      } else if (!a.isFinished && b.isFinished) {
        return -1;
      }
      return 0;
    })
  );
