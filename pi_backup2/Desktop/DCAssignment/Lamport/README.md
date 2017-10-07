# LamportLogicalClock

**Command to run:**  
**Linux / Mac**: ./lamport  
**Windows:** lamport.bat
  
Please provide input in this format: L,L,L,S,R-2,S   
L: Local event  
S: Send event  
R: Receive event. (R-2 indicates node 2 as the event sender)  

Enter the events for the node 1: L,S,L,R-3,S  
Enter the events for the node 2: L,R-1,S,L,R-1,L  
Enter the events for the node 3: L,R-2,L,S  

**Output:**  
Node: 1 : clock time - 1 : Event - LOCAL  
Node: 1 : clock time - 2 : Event - SEND  
Node: 2 : clock time - 1 : Event - LOCAL  
Node: 3 : clock time - 1 : Event - LOCAL  
Node: 2 : clock time - 3 : Event - RECEIVE  
Node: 2 : clock time - 4 : Event - SEND  
Node: 1 : clock time - 3 : Event - LOCAL  
Node: 3 : clock time - 5 : Event - RECEIVE  
Node: 3 : clock time - 6 : Event - LOCAL  
Node: 2 : clock time - 5 : Event - LOCAL  
Node: 3 : clock time - 7 : Event - SEND  
Node: 1 : clock time - 8 : Event - RECEIVE  
Node: 1 : clock time - 9 : Event - SEND  
Node: 2 : clock time - 10 : Event - RECEIVE  
Node: 2 : clock time - 11 : Event - LOCAL  

**Credits:** https://github.com/vijaykumarnj/Distributed-Computing
