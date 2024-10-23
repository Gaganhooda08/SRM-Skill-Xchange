import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import UserCard from "./UserCard";
import "./RegisteredUsersPage.css";

const RegisteredUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersCollectionRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);
        const usersList = await Promise.all(
          usersSnapshot.docs.map(async (userDoc) => {
            const userData = userDoc.data();
            const socialLinksRef = doc(
              db,
              "users",
              userDoc.id,
              "socialLinks",
              "links"
            );
            const socialLinksDoc = await getDoc(socialLinksRef);
            const socialLinks = socialLinksDoc.exists()
              ? socialLinksDoc.data()
              : {};
            return { id: userDoc.id, ...userData, socialLinks };
          })
        );
        setUsers(usersList);
      } catch (error) {
        setError("Failed to fetch users. Please try again later.");
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.registration.toLowerCase().includes(query) ||
      (Array.isArray(user.skills) &&
        user.skills.some((skill) => skill.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="registered-users-page">
      <h2>Registered Users</h2>
      <input
        type="text"
        placeholder="Search by name, skills, or registration no..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input modern-input"
      />
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      <div className="users-list">
        {filteredUsers.length > 0
          ? filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
          : !loading && <p>No users found.</p>}
      </div>
    </div>
  );
};

export default RegisteredUsersPage;
