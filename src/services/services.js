class Services {
  inputChange(e, callback) {
    callback(e)
  }
  submit(e, callback) {
    e.preventDefault();
    callback();
    e.target.reset();
  };
};

export default new Services();
