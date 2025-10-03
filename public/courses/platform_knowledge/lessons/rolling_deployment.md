### Rolling Deployment

Like replacing light bulbs one by one in a big building. You don't shut off all the lights at once — just one room at a time. As you replace them, the building still works. You slowly complete the update everywhere.

- No big disruption. Easy to spot issues early.
- Takes time, and problems might still spread.

---

Rolling Deployment is a software release strategy where the new version of an application is incrementally rolled out to a subset of infrastructure (e.g., servers, containers, pods) over time, while the remaining components continue to run the old version. This method ensures zero downtime and allows for continuous delivery, with the ability to pause, monitor, or rollback if issues are detected during the process.

---

For example, If Netflix wants to update its movie recommendation engine without disrupting millions of users globally. Assume, Netflix has 100 application servers running their old recommendation engine. They start by updating 5 servers to the new version. Netflix routes only a small portion of user traffic (say 5%) to these updated servers. They monitore metrics like, Latency, Errors and User engagement - If everything looks good, Netflix updates another 10 servers. This process rolls forward gradually, until all 100 servers are updated. At any point, if issues are detected, Netflix can stop the rollout or rollback the updated servers to the previous version.

---

*Learn continuously. Share generously*