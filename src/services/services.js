class Services {
  inputChange(e, callback) {
    callback(e)
  }
  submit(e, callback) {
    e.preventDefault();
    callback(0);
    e.target.reset();
  };
};

export default new Services();
