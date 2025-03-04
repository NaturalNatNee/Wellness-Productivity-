# Wellness-Productivity-
This repository is for practicing fullstack web development

## Inception Document: Wellness & Productivity App
Capstone Duration: 6 Weeks
- Team Size: 5
- Team Members: Nat (TL) Alex L, Trenton, Jose, Robbie
- Capstone Sponsor: Daniel De La Pena | ddelapena@uprighted.com

## 1. Project Overview
This capstone project involves developing a Wellness & Productivity App to help users optimize productivity and maintain well-being. The app will feature customizable work sessions, break timers, mood logging, and productivity insights. Given the team's size and experience level, the project is scoped to focus on core functionalities that are achievable within the timeframe.

## 2. Objectives
1. Build a Full-Stack MERN Application:
    - Gain hands-on experience with the MERN stack while focusing on practical and achievable goals.
    - Implement core functionalities such as authentication, data storage, and essential UI components.
2. Enhance Developer Skills:
    - Strengthen foundational knowledge in React, Express, MongoDB, and Node.js.
3. Promote Wellness & Productivity:
    - Equip users with tools to organize work sessions, take breaks, and reflect on productivity and well-being.

## 3. Core Features
  ### 3.1 Authentication
  - User Signup/Login: Secure user authentication with signup, login, and password management. Log in first, then prompt users to sign-up. 
  - Protected Routes: Restrict access to productivity data and settings for authenticated users only. Users only have access to their own data
  ### 3.2 Timer Functionality
Preferences (some flexibility)
  - Users can set work sessions and break intervals based on their preferences.
  - User can set the duration of the session times ( 1 specific time) in min/hrs
  - User can set duration of breaks (1 specific time) in min/hrs.
  - User can set amount of breaks. Breaks can suggest wellness tip
  - Expand pause feature (when cl stops session early)
Customizable Timer
  - Timer counts down or up from specified duration amount
  - During a break a delightful message is shown
  - Timer stops at the end of a session
  - Sessions are logged to a persistence layer with time of day

  ### 3.3 Mood Logging & Insights
Mood Logging:
  - After each session, users can log their mood with emoji (e.g., happy, neutral, stressed).
  - Data stored to track emotional well-being.
Basic Data Visualization:
  - Charts showing productivity patterns over time (e.g., daily, weekly).
  - Store data as a graph/chart with; session title, length, breaks, mood, time of day session.
 ###  3.4 Dark Mode
User Preference:
  - Toggle between light and dark modes for a comfortable user experience.
  - reuseable feature on all pages

## 4. Stretch Goals (Icebox/Optional) 
  - Preset Timer Settings:
    - Users can save and reuse customized timer presets (e.g.,50/10, 3 reps).
    - When breaks occur preferance, add specific wellness tip videos/graphics. 
  - Basic Reminder Notifications:
    - Reminders for upcoming sessions or scheduled breaks.
  - Basic Insights:
    - Simple insights on most productive times (e.g., morning vs. afternoon) without advanced analytics.
  - Sound Notifications:
    - Optional sound alerts for session start and end.
  - OAuth 2.0 for Google Sign-In:
    - Allow users to sign up and log in using their Google account for a smoother authentication experience.
  - Works on tablet and destop
  - Community Feature, such as leaderboard, adding other users to friends list, sending “good job” message during breaks.

## 5. Scope & Limitations
### Scope
  - Focus on building core functionalities while maintaining a clean and maintainable codebase.
  - Prioritize user authentication, timer customization, mood logging, and dark mode.
### Limitations
  - Advanced analytics, calendar integrations, and PWA functionality are out of scope.

## 6.  Basic Project Timeline & Milestones (See TRELLO https://trello.com/b/eH6YfN55/zenyourmess-the-wellness-group) for more details, update and changes
### Week 1: Planning & Setup
  - Project ideation and scope definition
  - Setting up the development environment (MERN stack)
  - Collab on wireframes and mockups
  - Initializing GitHub repository and establishing team workflow

### Week 2-3: Development
- Implementing core features (skeletons then work detail)
  - Timer frontend/backend -> POST PUT GET DELETE. Break features tips/things to do during break to optimize wellness and user wellbeing. When Timer STOPS, logs session length (start/stop), users mood, time of day session was completed, Session focus.
  - Auth frontend/backend -> POST PUT GET. Prompt the user to log-in if not then sign-put.
  - Tracking frontend/backend -> POST PUT GET DELET. Data to include; session length, break length and frequency, mood post session.
- Creating reusable components (break times, mood scale, start/end session, graphs, Auth)
- Integrating frontend with backend
- Database setup and CRUD operations
- Basic UI design

### Week 4: Refinement and Presentation Preparation
- Testing functionality and fixing bugs
- Polishing design
- Creating presentation slides

### Week 5: Presentation
- Practicing the presentation and Q&A
- Final project presentation
- Retrospective and documentation

## 7. Success Criteria
- Functional MERN application with user authentication.
- Working customizable timer.
- Mood logging and basic productivity insights.
- Intuitive UI with light/dark mode.
- clean, maintainable, and well-documented codebase.

## 8. Learning Outcomes
- Enhanced understanding of the MERN stack and full-stack development.
- Practical experience in implementing authentication and state management.
- Improved problem-solving and debugging skills.
- Exposure to agile development practices and version control with GitHub.

## 9. Potential Challenges & Considerations
- Balancing functionality and simplicity to maintain project scope.
- Ensuring consistent and effective team communication and collaboration.
