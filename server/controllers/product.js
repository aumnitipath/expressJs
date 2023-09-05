exports.read = async (req, res) => {
  res.send("Hello Controller Read");
};

exports.list = async (req, res) => {
  try {
    res.send("Hello Controller list");
  } catch (error) {
    console.log(error);
    res.status(500).send("Sever Error");
  }
};

exports.create = async (req, res) => {
  try {
    res.send("Hello Controller create");
  } catch (error) {
    console.log(error);
    res.status(500).send("Sever Error");
  }
};

exports.update = async (req, res) => {
  try {
    res.send("Hello Controller update");
  } catch (error) {
    console.log(error);
    res.status(500).send("Sever Error");
  }
};

exports.remove = async (req, res) => {
  try {
    res.send("Hello Controller delete");
  } catch (error) {
    console.log(error);
    res.status(500).send("Sever Error");
  }
};
