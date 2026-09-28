# 🧪 School Management System - Advanced Features & Evaluation Guide

Welcome to the updated **Testing & Verification Guide** for the School Management System. This document prepares you for testing the advanced features, OTP email security, event calendar, community chat, AI chatbot, and UI redesign.

---

## 🔑 Predefined Test Credentials

Use these verified credentials to test each role perspective:

| User Role | Full Name | Login Email | Password | Key Permissions & Access |
|---|---|---|---|---|
| 👑 **School Owner / Admin** | `ADMIN` | `owner@school.edu` | `password123` | Full access, Role Management, DB Status, Salary, Add Event, Delete Notice |
| 🎓 **Principal** | `Principal` | `principal@school.edu` | `password123` | Salary Management, Add Notice, Delete Notice, Add Event, Add Exam |
| 👨‍🏫 **Teacher** | `Sajith` | `teacher@school.edu` | `password123` | Add Subject, Add Exam & Grading, View Notices, Delete Notice |
| 🎒 **Student** | `Ruwin` | `student@school.edu` | `password123` | Student Roster, Event Calendar, Community Chat, Protected Exam Marks |
| 👨‍👩‍👧 **Parent** | `Amitha` | `parent@gmail.com` | `password123` | Tuition Status, Community Chat, Parent Feedback Portal |

---

## 🧪 Advanced Step-by-Step Test Cases

### 1. 🗑️ Test Case 1: Notice Deletion (Teachers, Principal, Admin)
- **Objective**: Verify that notice items can be deleted by authorized staff.
- **Steps**:
  1. Log in as `teacher@school.edu`, `principal@school.edu`, or `owner@school.edu`.
  2. On the Dashboard, navigate to **School Announcements & Notices**.
  3. Notice each notice card has a red **Trash Icon** button on the right.
  4. Click the Trash Icon on any notice card.
- **Expected Result**: The notice item is immediately removed from the active announcements feed.

---

### 2. 🔑 Test Case 2: 6-Digit Email OTP Verification for Forgot Password
- **Objective**: Verify that identity is strictly verified via OTP before unlocking password reset.
- **Steps**:
  1. On the Login screen, click **"Forgot Password?"**.
  2. Enter registered email `teacher@school.edu` and click **"Send Verification Code"**.
  3. The system generates a 6-digit OTP code (displayed in the info banner for testing, e.g. `849201`).
  4. Enter the 6-digit code and click **"Verify Code"**.
  5. Enter a new password and confirm.
- **Expected Result**: The password update screen is unlocked **only after successful 6-digit OTP verification**.

---

### 3. 📅 Test Case 3: Academic Event Calendar & Role Gating
- **Objective**: Verify event scheduling and role restrictions.
- **Steps**:
  1. Click **"Event Calendar"** on the left sidebar.
  2. Filter events by category: `Exams`, `PTA Meetings`, `Sports & Arts`, `Workshops`, `Holidays`.
  3. When logged in as **Principal** or **School Owner (Admin)**, click **"+ Add Event to Calendar"**. Fill out the event modal and click **Save**.
  4. Switch role view to **Student** or **Teacher**.
- **Expected Result**: Event is added to the calendar feed. When viewing as Student/Teacher/Parent, the "+ Add Event" button is hidden and replaced with an access restriction notice.

---

### 4. 🔒 Test Case 4: Protected Student Exam Marks Portal (OTP Verification)
- **Objective**: Verify identity verification before unlocking student grades and transcripts.
- **Steps**:
  1. Click **"Exam Marks & Report"** on the left sidebar.
  2. Enter Student Full Name `Ruwin`, Registration Number `REG-2026-001`, and Email `student@school.edu`. Click **Send OTP Verification Code**.
  3. Enter the 6-digit OTP verification code generated for demo (e.g. `938210`) and click **Verify & Unlock Exam Marks**.
- **Expected Result**: The protected academic transcript unlocks, displaying GPA 3.85 / 4.0, subject grade breakdown, and a **"Download Transcript PDF"** button.

---

### 5. 🤖 Test Case 5: AI School Assistant Chatbot & Protected Marks Lookup
- **Objective**: Test the floating AI chatbot's event answers and in-chat OTP verification for student marks.
- **Steps**:
  1. Click the floating purple **Bot Icon** in the bottom-right corner.
  2. Type `"When is the sports meet?"` or `"tell me upcoming events"`.
     - *Expected Result*: AI Bot lists upcoming calendar events.
  3. Type `"check my exam marks"`.
     - *Expected Result*: AI Bot requests Student Name & Registration Number.
  4. Type `Ruwin, REG-2026-001`.
     - *Expected Result*: AI Bot sends 6-digit OTP verification code.
  5. Type the 6-digit OTP code into the chat.
     - *Expected Result*: AI Bot displays the verified subject grades and GPA right inside the chat window!

---

### 6. 💬 Test Case 6: Community Discussion & Q&A Chat
- **Objective**: Test public Q&A channels for community interaction.
- **Steps**:
  1. Click **"Community Chat"** on the left sidebar.
  2. Switch between channels: `#general-announcements`, `#academic-help`, `#parent-forum`, `#teacher-lounge`.
  3. Type a message or question in the input box and click **Send**.
- **Expected Result**: Message is posted to the active channel stream with your role badge and timestamp.

---

## ⚡ Automated Verification Commands

Run this command in terminal to verify 100% build integrity:
```bash
cd client
npm run build
```
*(Expected output: `✓ built in X.XXs` with 0 compilation errors)*
