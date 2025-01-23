const MAPS = {
    1: `120
5 5
XXXXX
X   X
X   X
X   X
XXXXX
2
2 4 2 2
4 4 3 2`,

    2: `120
8 5
XXXXXXXX
X      X
X ==== X
X      X
XXXXXXXX
2
2 2 7 2
2 4 7 3`,

    3: `60
9 5
XXXXXXXXX
X       X
XXXX XXXX
XXXX XXXX
XXXXXXXXX
3
2 2 8 2
3 2 7 2
4 2 6 2`,

    4: `60
7 9
XXXXXXX
X     X
X     X
X== ==X
X== ==X
X     X
X     X
X X   X
XXXXXXX
2
4 8 6 2
5 8 6 3`,

    5: `90
7 7
XXXXXXX
X     X
X X   X
X     X
X     X
X     X
XXXXXXX
2
2 5 6 6
2 6 4 4`,

    6: `120
7 7
=======
=     =
= X   =
=     =
=     =
=     =
=======
2
2 5 6 6
2 6 4 4`,

    7: `180
8 7
XXXXXXXX
X      X
X XXX  X
X X X  X
X    X X
X      X
XXXXXXXX
3
4 4 2 6
5 5 4 2
6 4 6 4`,

    8: `150
7 7
XXXXXXX
XX   XX
X X X X
X     X
X X X X
XX   XX
XXXXXXX
4
4 2 4 3
6 4 3 4
4 6 4 5
2 4 5 4`,

    9: `120
9 9
XXXX XXXX
X  X X  X
XX XXX XX
X       X
X   X   X
X       X
XX XXX XX
X  X X  X
XXXX XXXX
4
2 2 3 5
8 2 4 5
8 8 6 5
2 8 7 5`,

    10: `1000
7 9
XXXXXXX
X     X
X  X  X
X= = =X
X     X
X = = X  
X     X
X     X
XXXXXXX
3
2 2 3 8
4 2 4 8
6 2 5 8`,

    11: `150
8 8
XXXXXXXX
X      X
X XXXX X
X X  X X
X    X X
X XXXX X
X      X
XXXXXXXX
4
4 4 2 4
5 4 5 2
5 5 7 5
4 5 4 7`,

    12: `150
7 7
XXXXXXX
XXXXXXX
X     X
XX X XX
XX   XX
XX X XX
XXXXXXX
4
3 5 3 5
3 3 5 5
5 3 5 3
5 5 3 3`,

    13: `90
9 9
=========
=       =
=   X   =
=       =
= X X X =
=       =
=   X   =
=       =
=========
4
3 4 3 6
4 4 4 6
6 4 6 6
7 4 7 6`,

    14: `180
10 10
XXXXXXXXXX
XXXXXXX  X
XXXXX=   =
=======  =
=        =
= X  =  ==
=    =====
=    =====
=    =====
==========
2
2 5 9 2
4 7 8 2`,

    15: `150
13 5
XXXXXXXXXXXXX
X           X
XX X X X X XX
X           X
XXXXXXXXXXXXX
5
3 3 11 3
5 3 9 3
7 3 7 3
9 3 5 3
11 3 3 3`,

    16: `180
14 12
==============
=            =
=            =
===========  =
=        X=  =
=         =  =
=  =    X =  =
=  =     X=  =
=  ========  =
=            =
=            =
==============
2
5 6 2 2
2 2 10 6`,

    17: `120
7 9
XXXXXXX
X  X  X
X     X
X X=X X
X === X
X X=X X
X     X
X  X  X
XXXXXXX
4
2 2 3 3
6 2 2 5
6 8 6 5
2 8 5 3`,

    18: `150
11 11
XXXXXXXXXXX
X         X
X X=X=X=X X
X =     = X
X X  X  X X
X   XX    X
X X   X X X
X =     = X
X X=X=X=X X
X         X
XXXXXXXXXXX
3
4 6 5 10
6 4 6 10
8 8 7 10`,

    19: `90
9 9
XXXXXXXXX
X       X
X X   X X
X       X
X   X   X
X       X
X X   X X
X       X
XXXXXXXXX
8
2 2 2 2
5 2 3 2
8 2 4 2
8 5 4 3
8 8 4 4
5 8 3 4
2 8 2 4
2 5 2 3`,

    20: `240
11 7
XXXXXXXXXXX
XXXX X XXXX
X         X
XX X X X XX
X         X
XXXX X XXXX 
XXXXXXXXXXX
6        
3 4 9 4
5 4 7 4
6 3 6 5
6 5 6 3
7 4 5 4
9 4 3 4`,

    21: `1000
7 5
XXXXXXX
X     X
X     X
X     X
XXXXXXX
4
4 2 5 3
2 2 4 2
4 3 6 2
5 3 5 2`,

    22: `1000
7 7
XXXXXXX
X     X
X  X  X
X X= XX
X     X
X  X  X
XXXXXXX
4
2 2 2 4
6 2 4 5
6 6 5 4
2 6 4 2`,

    23: `1000
11 8
XXXXXXXXXXX
=   X  X  X
=  XX  X  = 
= X XX    =
=       =XX
=X =XX  X X
=    X    X
XXXXXXXXXXX
4
6 2 4 2
7 2 10 6
6 3 5 7
7 3 10 2`,

    24: `120
10 9
==========
=       ==
=        =
=  XX   ==
=  X     =
= X X   ==
=        =
=       ==
==========
3
4 6 9 3
3 5 9 5
5 5 9 7`,

    25: `240
10 10 
==========  
=        =
=        =
=   X    =
=  X     =
=    X   =
=     X  =
=        =
=        =
==========
4
4 4 4 9
5 5 3 9
6 7 2 8 
7 6 2 7`,

    26: `1000
7 5
XXXXXXX
=    XX
XXX  XX
XXX   X
XXXXXXX
4
5 2 4 3
4 2 5 3
2 2 2 2
4 3 3 2`,

    27: `1000
10 8
XXXXXXXXXX
XXX      X
XXX      X
X     =X X
X     =X X
X ===    X
X X=     X
XXXXXXXXXX
4
3 5 2 6
5 2 4 3
5 5 3 5
2 5 2 5`,

    28: `1000
7 7
X===XXX
==    X
X   X X
X   X X
X   X X
X     X
XXXXXXX
4
3 3 3 2
3 4 6 5
4 4 3 3
3 5 6 4`,

    29: `1000
7 5
XXXXXXX
XX    X
XX    X
X     X
XXXXXXX
3
4 2 4 3
3 3 6 3
4 3 5 3`,

    30: `1000
8 5
XXXXXXXX
X    X X
X    X X
X      X
XXXXXXXX
4
3 3 3 4
5 2 2 3
3 2 4 4
4 2 2 4`,

    31: `120
11 5
XXXXXXXXXXX
X   X X   X
X X X X X X
X   X X   X
XXXXXXXXXXX
3
3 2 3 4
6 3 6 3
9 4 9 2`,

    32: `180
13 10
XXXXXXXXXXXXX
X     X     X
X     X    XX
X     X     X
X== ==X== ==X
X== ==X== ==X
X     X     X
XX    X     X
X     X     X
XXXXXXXXXXXXX
4
2 9 4 6
6 9 4 5
8 2 10 6
12 2 10 5`,

    33: `180
11 9
XXXXXXXXXXX
X        XX
XX X X X XX
X         X
XXXXXXXXXXX
X         X
XX X X X XX
XX        X
XXXXXXXXXXX
4
3 3 9 3
7 3 5 3
5 7 7 7
9 7 3 7`,

    34: `120
15 8
===============
=      =      =
=      =      =
=  XX      X  =
=  X      XX  =
=      =      =
=      =      =
===============
2
5 5 3 3
11 4 13 6`,

    35: `120
16 6
XXXXXXXXXXXXXXXX
=       =      X
XXXX XXXX X    X
XXXX XXXX    X X
XXXX XXXX      X
XXXX=XXXXXXXXXXX
5
2 2 8 2
3 2 7 2
4 2 6 2
11 4 14 2
11 5 14 3`,

    36: `120
11 11
=X=X=X=X=X=
X         X
=    X    =
X         X
=         =
X X === X X
=         =
X         X
=    X    =
X         X
=X=X=X=X=X=
4
6 2 4 6
10 6 5 5
6 10 7 5
2 6 8 6`
}; 