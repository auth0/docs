### Batch size

When setting your **BATCH_SIZE**, please keep the following information in mind.

During each time frame/window (defined by your chosen **Schedule**), outstanding logs will be batched into groups and sent. The size of each group is determined by the **BATCH_SIZE** value.

In other words, during each window, `NUM_BATCHES` batches of logs will be sent based on the following logic:

```
IF (NUM_LOGS modulo 100 == 0):
  NUM_BATCHES = (NUM_LOGS / BATCH_SIZE)
ELSE:
  NUM_BATCHES = (NUM_LOGS / BATCH_SIZE) + 1
```

In the `ELSE` case, the last batch will have < 100 logs.