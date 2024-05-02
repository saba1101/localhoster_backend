const Hosts = require("../../models/product/hosts");
const Category = require("../../models/product/category");
const AuthSessions = require("../../models/authentication/authSessions");
const create_host = async (req, res) => {
  try {
    const requestBody = req.body;
    const hostAuthor = await AuthSessions.findOne({
      Token: req.headers.authorization.split(" ")[1],
    });

    const hostWithAuthor = { ...requestBody, Author: hostAuthor.UserName };
    const host = await Hosts.create(hostWithAuthor);

    res.status(200).json(host);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const get_hosts = async (req, res) => {
  try {
    const hosts = await Hosts.find({});
    const hostsProccessed = await Promise.all(
      hosts.map(async (host) => {
        const amenities = await Category.find({ _id: { $in: host.Amenities } });
        const amenityNames = amenities.map((amenity) => amenity.Title);
        return {
          ...host.toObject(),
          Amenities: amenityNames,
          AmenitiesIds: amenities,
        };
      })
    );
    res.status(200).json(hostsProccessed);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const update_host = async (req, res) => {
  try {
    const { id } = req.params;
    const host = await Hosts.findByIdAndUpdate(id, req, body);
    if (!host) {
      res.status(500).json({ message: "cannot find host" });
      return;
    } else {
      res.status(200).json({ res });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const delete_host = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteHost = await Hosts.findByIdAndDelete(id);
    res.status(200).json(deleteHost);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  create_host,
  get_hosts,
  update_host,
  delete_host,
};
