#REAMDE for Clide

## Functional Specification
User should be able to:
- List all sequences, inactive, active, or both
- User should be able to play or pause all sequences or individual sequences
- User should be able to add a new sequence
- User should be able to remove a sequence or clear all sequences
- User should be able to set the speed of all or individual sequence

## Commands:

* quit, q - quit
* ls - list sequences
* pl [i] - play sequences (or ith if specified)
* pa [i] - pause sequences (or ith if specified)

* clear - remove all sequences 
* rm [i] - removes ith sequence

* ss [i] time: in ms - set speed for ith sequence

* a [sequence_string] - add new sequence
(sequence strings are composed of sample names separated by spaces)

## Available samples (not case sensitive): 
* BD - bass drum
* SD - snare drum
* HH - high hat
* HT - high tom
* LT - low tom
* CY - cymbal
* ,  - rest