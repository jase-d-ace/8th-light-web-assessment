class Services {
  inputChange(e, callback) {
    callback(e)
  }
  submit(e, callback) {
    e.preventDefault();
    callback();
  };
};

export default new Services();
