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
