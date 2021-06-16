import { createSlice } from "@reduxjs/toolkit";
const permissSlice = createSlice({
  name: "permission",
  initialState: [],
  reducers: {
    getPermission(){},
    setPermission(state, action) {
      return action.payload
    }
  }
})

export const { getPermission, setPermission } = permissSlice.actions
export default permissSlice.reducer