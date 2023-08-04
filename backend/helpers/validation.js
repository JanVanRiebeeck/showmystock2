exports.validateEmail = (email) => {
  return (
    String(email)
      .toLowerCase()
      // takes an email address and returns the result of applying a regular expression to that email address
      .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/)
  );
};

exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};
