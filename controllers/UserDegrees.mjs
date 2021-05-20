import axios from "axios";
const addUserDegrees = async (req, res) => {
  try {
    const config = {
      headers: { Authorization: req.headers.authorization }
    };
    let { data } = await axios.post(
      `${process.env.apiEmployee}/api/user-degrees`,
      req.body,config
    );
    res.send(data);
  } catch (error) {
    console.log(error)
  }
  
};
const updateUserDegrees = async (req, res) => {
  try {
    const config = {
      headers: { Authorization: req.headers.authorization }
    };
    let { id } = req.params;
    let { data } = await axios.put(
      `${process.env.apiEmployee}/api/user-degrees/${id}`,
      req.body,config
    );
    res.send(data);
  }
   catch (error) {
   console.log(error) 
  }
}
    
export { addUserDegrees, updateUserDegrees };
