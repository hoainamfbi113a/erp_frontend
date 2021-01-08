import axios from "axios"
const transfers = async (req,res) => {
    let  {data}  = await axios.get(`${process.env.apiEmployee}/api/transfers`);
    res.send(data);
}
const profileTransfers = async (req,res) => {
    let  {data}  = await axios.get(`${process.env.apiEmployee}/api/transfers/profiles/${req.params.id}?type=profile`);
    res.send(data);
}
export {
    transfers,
    profileTransfers
}