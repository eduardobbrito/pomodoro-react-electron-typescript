## **MVP:**

- [x] User should have two different kinds of timers, one for Pomodoro Sessions and other for Breaks
- [x] By standard, Pomodoro lasts 25 minutes and Breaks lasts 5 minutes
- [x] User should be able to start and pause each timer
- [ ] User should be able to reset both timers
- [x] Once Pomodoro timer finishes, Break timer must begin immediatly

### **feature#01**

- [x] Use `moment` and `moment-duration-format` to handle minutes arithmetics
- [x] Add Session component w/ increment/decrement btns
- [x] Add Break component w/ increment/decrement btns
- [x] Add Control timer start/stop btn

### **feature#02**

- [ ] Add Reset btn
- [ ] Add styling
- [ ] Add audio feedback

### **feature#03**

- [ ] Add Long Break timer (runs after 4 Pomodoro cicles)
- [ ] Add ticking sound
- [ ] Add System notification
- [ ] Add toggle silent mode

### **feature#04**

- [ ] Add minimize to System Tray
- [ ] Add Preferences (Default time for each timer, auto start next timer, handle notifications, handle sounds)

## Known Issues

- User can alter timer length after while it's running
