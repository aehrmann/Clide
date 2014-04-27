#REAMDE for beeline

## Functional Specification
User should be able to:
- List all sequences, inactive, active, or both
- User should be able to play or pause all sequences or individual sequences
- User should be able to add a new sequence
- User should be able to remove a sequence or clear all sequences
- User should be able to set the speed of all or individual sequence

Commands:
quit, q - quit
ls - list sequences
lsa - list active sequences
lsi - list unactive sequences

(all play and pause commands stop and restart all sequences to keep time)
pl [i] - play sequences (or ith if specified)
pa [i] - pause sequences (or ith if specified)

a sequence_string - add new sequence

cls [i] - remove all sequences (or ith sequence) [prompts for confirmation]

ss [i] time: in BPM or ms - set speed for all sequences(or ith sequence is specified)