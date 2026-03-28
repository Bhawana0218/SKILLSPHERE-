export const calculateReputation = (reviews) => {
  if (reviews.length === 0) return 0;

  let total = 0;

  reviews.forEach((r) => {
    total += r.rating;
  });

  return (total / reviews.length).toFixed(1);
};