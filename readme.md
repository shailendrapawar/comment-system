# Comment System (Frontend + Backend)

A simple nested comment system with replies and delete support.

---

## 🛠 Tech Stack

### Frontend
- React
- Context API (user/auth)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication

---

## ✅ Features

### Frontend
- Add new comments
- Reply to comments (nested)
- Show / hide replies
- Lazy load replies
- Delete comment (only by author)
- Recursive comment UI

### Backend
- Create comments & replies
- Fetch top-level comments
- Fetch replies by `parentId`
- Soft delete comments
- Return author details with comments
- Maintain `replyCount`

---

## 🧩 Comment Structure

- `parentId = null` → main comment  
- `parentId = commentId` → reply  

---

## 🔐 Permissions

- Only logged-in users can comment
- Only comment author can delete their comment

---

## 🔁 API Overview

- `POST /comments` → add comment / reply  
- `GET /comments?postId=ID` → get main comments  
- `GET /comments?postId=ID&parentId=ID` → get replies  
- `PUT /comments/:id` → update /soft delete comment 

---

## 📌 optimizations

- Replies are loaded only when needed
- Deleted comments stay in DB (soft delete)
- UI updates instantly without full reload
