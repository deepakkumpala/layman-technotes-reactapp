### Business Continuity (BC) 
Business Continuity is about keeping your business running smoothly, even when something goes wrong—like a power cut, system outage, or network failure. It focuses on being proactive. For example, a coffee shop that uses a backup generator to keep brewing coffee during a power outage is practicing business continuity. In the IT world, this means having things like backup servers, load balancers, and high availability systems already in place so there’s no disruption. The goal is to **avoid downtime entirely** or reduce it to a bare minimum.

---

### Disaster Recovery (DR)
Disaster Recovery is about bouncing back after something bad happens—like a cyberattack, natural disaster, or hardware failure. If the same coffee shop is damaged by a fire and needs to replace equipment and reopen, that's disaster recovery. In IT, this means restoring systems and data from backups, switching to alternate systems, and getting operations back to normal. The focus here is **reactive**—what to do *after* things go wrong.

---

### Understanding RPO and RTO
When planning for BC and DR, two key terms are:  
- **RPO (Recovery Point Objective):** How much data can you afford to lose? For example, if your RPO is 1 hour, you must back up your data at least every hour.  
- **RTO (Recovery Time Objective):** How quickly should your systems be up and running after a failure? If your RTO is 4 hours, you must recover within that time to avoid business impact.

A strong BC/DR plan ensures both low RPO (minimal data loss) and low RTO (fast recovery).

---

Imagine a company’s main data center is flooded, knocking all systems offline. Here’s what disaster recovery would look like:  
1. **Backups Restored:** Data is recovered from cloud or offsite storage.  
2. **Failover Activated:** Services switch to a backup data center in another city.  
3. **Infrastructure Rebuilt:** Damaged hardware is replaced or fixed.  
4. **System Testing:** Teams ensure applications work properly before going live.  
5. **Post-Incident Review:** Lessons are captured to improve future responses.

Common DR strategies include using cloud backups, running DR drills, and having disaster recovery-as-a-service (DRaaS). These help reduce **downtime and data loss**, keeping businesses running with minimal impact.

