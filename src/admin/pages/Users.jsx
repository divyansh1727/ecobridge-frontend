import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map(u => (
        <div key={u._id}>
          {u.email} - {u.role}
        </div>
      ))}
    </div>
  );
}