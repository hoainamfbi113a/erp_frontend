import axios from "axios";


const getAllCity = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://thongtindoanhnghiep.co/api/city`,
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const getAllDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(
      `https://thongtindoanhnghiep.co/api/city/${id}/district`,
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

export { getAllCity, getAllDistrict };
