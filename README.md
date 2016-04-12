# Clide - the command line beat sequencer

This project is an experiment with Node js. The name is a rather dumb portmanteu of
the acronym CLI ("command line interface") and the name of the legendary 
drummer [Clyde Stubblefield]("https://en.wikipedia.org/wiki/Clyde_Stubblefield"). I know,
not terribly clever, forgive me.


## Commands:

* quit, q - quit
* ls - list sequences
* pl <i> - play sequences (or ith if specified)
* pa <i> - pause sequences (or ith if specified)

* clear - remove all sequences 
* rm <i> - removes ith sequence

* ss <i> time: in ms - set speed for ith sequence

* a <sequence_string> - add new sequence
(sequence strings are composed of sample names separated by spaces)

## Available samples (not case sensitive): 
* BD - bass drum
* SD - snare drum
* HH - high hat
* HT - high tom
* LT - low tom
* CY - cymbal
* ,  - rest
