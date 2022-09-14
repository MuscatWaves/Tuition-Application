export const blueNotify = (theme) => ({
  root: {
    backgroundColor: theme.colors.blue[6],
    borderColor: theme.colors.blue[6],

    "&::before": { backgroundColor: theme.white },
  },

  title: { color: theme.white },
  description: { color: theme.white },
  closeButton: {
    color: theme.white,
    "&:hover": { backgroundColor: theme.colors.blue[7] },
  },
});

export const greenNotify = (theme) => ({
  root: {
    backgroundColor: theme.colors.teal[6],
    borderColor: theme.colors.teal[6],

    "&::before": { backgroundColor: theme.white },
  },

  title: { color: theme.white },
  description: { color: theme.white },
  closeButton: {
    color: theme.white,
    "&:hover": { backgroundColor: theme.colors.green[7] },
  },
});

export const redNotify = (theme) => ({
  root: {
    backgroundColor: theme.colors.red[6],
    borderColor: theme.colors.red[6],

    "&::before": { backgroundColor: theme.white },
  },

  title: { color: theme.white },
  description: { color: theme.white },
  closeButton: {
    color: theme.white,
    "&:hover": { backgroundColor: theme.colors.red[7] },
  },
});
