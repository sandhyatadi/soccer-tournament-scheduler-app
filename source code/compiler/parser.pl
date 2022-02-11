% Author: Jigisha Deven Gadhia, Sandhya Tadi

%:-use_rendering(svgtree).
main(Tokens,T):-absolute_file_name('file.txt',Abs), open(Abs,read,Str),
         read_tokens(Str,Tokens),program(T,Tokens,[]).
main(Tokens,T):-absolute_file_name('file.txt',Abs),
         open(Abs,read,Str),
         read_tokens(Str,Tokens),not(program(T,Tokens,[])),write("syntax error"),fail.
   read_tokens(Stream,[]):-
         at_end_of_stream(Stream).

   read_tokens(Stream,[X|L]):-
         \+  at_end_of_stream(Stream),
         read(Stream,X),
         read_tokens(Stream,L).
%Left recursion is removed for the following terms using Table command
:-table expression/3, sub_term/3, mult_term/3, div_term/3, mod_term/3, factor_term/3, command/3, boolean/3,print/3,string/3.
%DCG for program and block
program(t_program(X)) -->['{'],block(X),['}'].
block(t_block(X,Y))  --> initialize(X),command(Y).
%DCG for initialization
initialize(t_declaration(X,Y)) --> initialize1(X),[;],initialize(Y).
initialize(t_declaration(X)) --> initialize1(X).
initialize1(t_initializeInt(X,Y)) --> [int],identifier(X),[=],int(Y) .
initialize1(t_initializeIdent(X,Y)) --> [int],identifier(X),[=],identifier(Y) .
initialize1(t_initializeFloat(X,Y)) --> [float],identifier(X),[=],float(Y) .
initialize1(t_initializeFloatIdent(X,Y)) --> [float],identifier(X),[=],identifier(Y) .
initialize1(t_initializeDouble(X,Y)) --> [double],identifier(X),[=],double(Y).
initialize1(t_initializeDoubleIdent(X,Y)) --> [double],identifier(X),[=],identifier(Y) .
initialize1(t_initializeStr(X,Y)) -->[string],identifier(X),[=],string(Y) .
initialize1(t_initializeStrIdent(X,Y)) -->[string],identifier(X),[=],identifier(Y) .
initialize1(t_initializeBool(X,Y)) -->[bool],identifier(X),[=],boolean(Y) .
initialize1(t_initializeBoolIdent(X,Y)) -->[bool],identifier(X),[=],identifier(Y) .
initialize1(t_initialize(X)) --> declaration(X).
initialize1(t_initialize(empty)) --> [].
%DCG for declaration
declaration(t_declInt(X)) -->  [int],identifier(X) .
declaration(t_declDouble(X)) -->[double],identifier(X) .
declaration(t_declStr(X)) --> [string],identifier(X) .
declaration(t_declFloat(X)) -->[float],identifier(X) .
declaration(t_declBool(X)) -->[bool],identifier(X) .
%DCG for command
command(t_command(X,Y)) --> command1(X),command(Y).
command(t_command(empty))--> [].
command1(t_assignExpr(X,Y)) -->identifier(X),[=],expression(Y),[;] .
command1(t_assignStr(X,Y)) -->identifier(X),[=],string(Y),[;] .
command1(t_commandif(X)) --> if(X) .
command1(t_commandwhile(X)) --> while(X) .
command1(t_commandfor(X)) --> for(X) .
command1(t_commandprint(X)) --> print(X),[;] .
command1(t_commandUnary(X)) --> unaryoperator(X),[;] .
command1(t_commandstrf(X)) --> stringfunc(X),[;] .
%DCG for String functions: string length
stringfunc(t_strfunclen(X)) --> stringlen(X).
stringlen(t_strlenIdent(X,Y)) -->identifier(X),[=], [strlen],['('],identifier(Y),[')'] .
stringlen(t_strlenStr(X,Y)) -->identifier(X),[=] , [strlen],['('],string(Y),[')'].
%DCG for ternary, while, for and if
ternary(t_ternary(X,Y,Z)) --> ['('], boolean(X), [')'], [?], ['{'], expression(Y), ['}'], [:], ['{'], expression(Z), ['}'].
while(t_while(X,Y)) --> [while], ['('], boolean(X), [')'], ['{'], block(Y), ['}'].
for(t_for(W,X,Y,Z)) --> [for], ['('], initialize1(W), [;], boolean(X),[;], unaryoperator(Y),  [')'], ['{'], block(Z), ['}'].
for(t_for1(W,X,Y,Z)) --> [for],identifier(W), [in],[range], ['('], int(X),[','], int(Y), [')'], ['{'], block(Z), ['}'].
for(t_for1id(W,X,Y,Z)) --> [for],identifier(W), [in],[range], ['('], identifier(X),[','], identifier(Y), [')'], ['{'], block(Z), ['}'].
if(t_if(X,Y,Z)) --> [if],['('],boolean(X),[')'],['{'],block(Y),['}'],[else],['{'],block(Z),['}'] .
if(t_ifelse(X,Y,Z)) -->[if],['('],boolean(X),[')'],['{'],block(Y),['}'],elseif(Z).
elseif(t_elseif1(X,Y,Z)) --> [elseif],['('],boolean(X),[')'],['{'],block(Y),['}'],[else],['{'],block(Z),['}'].
elseif(t_elseif2(X,Y,Z)) --> [elseif],['('],boolean(X),[')'],['{'],block(Y),['}'],elseif(Z).
elseif(t_elseif3(empty)) --> [].
%DCG for print statements
print(t_print(X)) --> [print], ['('], statement(X), [')'].
print(t_print(empty)) --> [print], ['('], [')'].
statement(t_statement(X,Y)) --> statement1(X), statement(Y).
statement(t_statement(X)) --> statement1(X).
statement1(t_statementStr(X)) --> string(X),!.
statement1(t_statementIdent(X)) --> identifier(X),!.
statement1(t_statementNewline(line)) --> [#],!.
%DCG for Unary operations i.e increment and decrement
unaryoperator(t_incr(X)) --> identifier(X),[++] .
unaryoperator(t_decr(X)) --> identifier(X),[--].
%DCG for Boolean expressions
boolean(t_boolean(true)) --> [true],!.
boolean(t_boolean(false)) --> [false],!.
boolean(t_booleanExpr(X,Y)) -->  expression(X), [==], expression(Y).
boolean(t_booleanNot(X)) -->  [!], boolean(X).
boolean(t_booleanLesThan(X,Y)) --> expression(X), [<<], expression(Y).
boolean(t_booleanGrtThan(X,Y)) --> expression(X), [>>], expression(Y).
boolean(t_booleanGrtEql(X,Y)) --> expression(X), [>=], expression(Y).
boolean(t_booleanLesEql(X,Y)) --> expression(X), [<=], expression(Y).
boolean(t_booleanExpr(X)) --> expression(X).
boolean(t_booleanOr(X,Y)) --> boolean(X), [or], boolean(Y).
boolean(t_booleanAnd(X,Y)) --> boolean(X), [and], boolean(Y).
%DCG for general expressions and arithmatic expressions
expression(t_addition(X,Y)) --> expression(X), [+], sub_term(Y).
expression(X) --> sub_term(X).
sub_term(t_subtraction(X,Y)) --> sub_term(X), [-], mult_term(Y).
sub_term(X) --> mult_term(X).
mult_term(t_multiplication(X,Y)) --> mult_term(X), [*], div_term(Y).
mult_term(X) --> div_term(X).
div_term(t_division(X,Y)) --> div_term(X), [/], mod_term(Y).
div_term(X) --> mod_term(X).
mod_term(t_modulo(X,Y)) --> mod_term(X), ['%'], factor_term(Y).
mod_term(X) --> factor_term(X).
factor_term(t_assignment(X,Y)) --> identifier(X), [=], expression(Y).
factor_term(t_parenthesis(X)) -->['('],expression(X),[')'].
factor_term(t_ternary(X)) --> ternary(X).
factor_term(X) --> term(X).
term(X) --> double(X).
term(X) -->identifier(X).
string(t_Str(S)) --> [S], {string(S)}.
double(t_numb(X)) --> [X], {number(X)}.
identifier(t_identifier(X)) --> [X], {X\=';',X\='#',X\=true,X\=false,X\=if,X\=for,X\=elseif,X\=else,X\=int,X\=float,X\=double,X\=string,X\=print,X\=bool,X\=while,X\=identifier,atom(X)}.
int(t_int(X)) --> [X],{integer(X)}.
float(t_float(X)) --> [X], {number(X)}.

%PROGRAM FOR EVALUTATION
%Author: Akhila Sai Mandava, Sonia Kalidindi, Sandhya Tadi
% eliminating left recursion for the following.
:-table eval_expression/4,eval_initialize/3,eval_sub_term/4,eval_mult_term/4,eval_div_term/4,eval_mod_term/4,eval_factor_term/4,eval_boolean/4.
:-discontiguous eval_for/3,eval_for/4.
%evalutaion for program and block.
eval_program(t_program(X)):- eval_block(X,[],_).
eval_block(t_block(X,Y),Env,NewEnv):- eval_initialize(X,Env,TempEnv),eval_command(Y,TempEnv,NewEnv).

/* NewEnv is used to represent the new environment as the environment keeps on changing due to the updations.
when there are intermediate environments then TempEnv1,TempEnv2,TempEnv3,TempEnv4 are used to represent the intermediate environments and
Newenv is used to represent the final environment. */
%evalutaion for initialize
eval_initialize(t_declaration(X,Y),Env,NewEnv) :- eval_initialize1(X,Env,Env1),eval_initialize(Y,Env1,NewEnv).
eval_initialize(t_declaration(X),Env,NewEnv) :- eval_initialize1(X,Env,NewEnv).
eval_initialize1(t_initializeInt(X,Y),Env,NewEnv) :- eval_identifier(X,R),eval_int(Y,Value),update(R,Value,int,Env,NewEnv).
eval_initialize1(t_initializeIdent(X,Y),Env,NewEnv) :- eval_identifier(X,R),eval_identifier(Y,R1),lookup(R1,Env,Value),update(R,Value,int,Env,NewEnv).
eval_initialize1(t_initializeFloat(X,Y),Env,NewEnv) :- eval_identifier(X,R),eval_float(Y,Value),update(R,Value,float,Env,NewEnv).
eval_initialize1(t_initializeFloatIdent(X,Y),Env,NewEnv) :- eval_identifier(X,R),eval_identifier(Y,R1),lookup(R1,Env,Value),update(R,Value,float,Env,NewEnv).
eval_initialize1(t_initializeDouble(X,Y),Env,NewEnv) :-eval_identifier(X,R),eval_double(Y,Value),update(R,Value,double,Env,NewEnv).
eval_initialize1(t_initializeDoubleIdent(X,Y),Env,NewEnv) :-eval_identifier(X,R),eval_identifier(Y,R1),lookup(R1,Env,Value),update(R,Value,double,Env,NewEnv).
eval_initialize1(t_initializeStr(X,Y),Env,NewEnv) :-eval_identifier(X,R),eval_string(Y,Value),update(R,Value,string,Env,NewEnv).
eval_initialize1(t_initializeStrIdent(X,Y),Env,NewEnv) :-eval_identifier(X,R),eval_identifier(Y,R1),lookup(R1,Env,Value),update(R,Value,string,Env,NewEnv).
eval_initialize1(t_initializeBoolean(X,Y),Env,NewEnv) :- eval_identifier(X,R),eval_boolean(Y,Value),update(R,Value,bool,Env,NewEnv).
eval_initialize1(t_initializeBooleanid(X,Y),Env,NewEnv) :-eval_identifier(X,R),eval_identifier(Y,R1),lookup(R1,Env,Value),update(R,Value,bool,Env,NewEnv).
eval_initialize1(t_initialize(X),Env,NewEnv) :-eval_declaration(X,Env,NewEnv).
eval_initialize1(t_initialize(empty),Env,Env).

%evalutaion for declaration
eval_declaration(t_declInt(X), Env, NewEnv) :- eval_identifier(X,R),update(R, null, int,Env,NewEnv).
eval_declaration(t_declFloat(X), Env, NewEnv) :- eval_identifier(X,R),update(R, null, float,Env,NewEnv).
eval_declaration(t_declDouble(X), Env, NewEnv) :- eval_identifier(X,R),update(R, null, double,Env,NewEnv).
eval_declaration(t_declStr(X), Env, NewEnv) :- eval_identifier(X,R), update(R, null, string,Env,NewEnv).
eval_declaration(t_declBool(X), Env, NewEnv) :- eval_identifier(X,R),update(R, null, bool,Env,NewEnv).

%evalutaion for command
eval_command(t_command(X,Y),Env,NewEnv) :- eval_command1(X,Env,Env1),eval_command(Y,Env1,NewEnv).
eval_command(t_command(empty),Env,Env).
eval_command1(t_assignExpr(X,Y),Env,NewEnv) :- eval_identifier(X,R), eval_expression(Y,Env,Env1,Value),lookup(R,Env1,_),update(R,Value,int,Env1,NewEnv).
eval_command1(t_assignStr(X,Y),Env,NewEnv) :- eval_identifier(X,R),eval_string(Y,Value),lookup(R,Env,_),update(R,Value,string,Env,NewEnv).
eval_command1(t_commandif(X),Env,NewEnv) :- eval_if(X,Env,NewEnv).
eval_command1(t_commandwhile(X),Env,NewEnv) :- eval_while(X,Env,NewEnv).
eval_command1(t_commandfor(X),Env,NewEnv) :- eval_for(X,Env,NewEnv).
eval_command1(t_commandprint(X),Env,Env) :- eval_print(X,Env).
eval_command1(t_commandUnary(X),Env,NewEnv) :- eval_unaryoperator(X,Env,NewEnv).
eval_command1(t_commandstrf(X),Env,NewEnv) :- eval_stringfunc(X,Env,NewEnv).

%evalutaion for string functions
eval_stringfunc(t_strfunclen(X),Env,NewEnv) :- eval_stringlen(X,Env,NewEnv).
eval_stringlen(t_strlenIdent(X,Y),Env,NewEnv) :- eval_identifier(X,R),eval_identifier(Y,R1),lookup(R1,Env,S),S\=null,eval_stringlen(S,Len),lookup(R,Env,_),update(R,Len,int,Env,NewEnv).
eval_stringlen(t_strlenStr(X,Y),Env,NewEnv) :-  eval_identifier(X,R),eval_string(Y,S),eval_stringlen(S,Len),lookup(R,Env,_),update(R,Len,int,Env,NewEnv).
eval_stringlen(X,R) :- atom_length(X,R).

%evalutaion for ternary operations.
eval_ternary(t_ternary(X,Y,_),Env,NewEnv,Value1) :- eval_boolean(X,Env,TempEnv1,Y1),Y1 = true,eval_expression(Y,TempEnv1,NewEnv,Value),Value1 is Value.
eval_ternary(t_ternary(X,_,Z),Env,NewEnv,Value1) :- eval_boolean(X,Env,TempEnv1,Y1),Y1 = false,eval_expression(Z,TempEnv1,NewEnv,Value),Value1 is Value.
%evalutaion for while loop.
eval_while(t_while(X,Y),Env,NewEnv) :- eval_boolean(X,Env,TempEnv1,Y1),Y1 = true,eval_block(Y,TempEnv1,TempEnv2),eval_while(t_while(X,Y),TempEnv2,NewEnv).
eval_while(t_while(X,_),Env,NewEnv) :- eval_boolean(X,Env,NewEnv,Y1),Y1 = false.

%evalutaion for 'for' loop.
eval_for(t_for(W,X,Y,Z),Env,NewEnv) :- eval_initialize1(W,Env,TempEnv1),eval_boolean(X,TempEnv1,TempEnv2,Y1),Y1=true,eval_block(Z,TempEnv2,TempEnv3),eval_unaryoperator(Y,TempEnv3,TempEnv4),eval_for(t_for(W,X,Y,Z),W,TempEnv4,NewEnv).
eval_for(t_for(W,X,_,_),Env,NewEnv) :- eval_initialize1(W,Env,TempEnv1),eval_boolean(X,TempEnv1,NewEnv,Y1),Y1=false.
eval_for(t_for(W,X,Y,Z),W,TempEnv1,NewEnv) :- eval_boolean(X,TempEnv1,TempEnv2,Y1),Y1=true,eval_block(Z,TempEnv2,TempEnv3),eval_unaryoperator(Y,TempEnv3,TempEnv4),eval_for(t_for(W,X,Y,Z),W,TempEnv4,NewEnv).
eval_for(t_for(W,X,_,_),W,TempEnv1,NewEnv) :- eval_boolean(X,TempEnv1,NewEnv,Y1),Y1=false.
eval_for(t_for1(W,X,Y,Z),Env,NewEnv) :- eval_identifier(W,A),eval_int(X,Value1),update(A,Value1,int,Env,TempEnv1),lookup(A,TempEnv1,Value),eval_int(Y,Value2),Value1<Value2,Value>=Value1,Value<Value2,eval_block(Z,TempEnv1,TempEnv2),NewR is Value+1,update(A,NewR,int,TempEnv2,TempEnv3),eval_for(t_for1(W,X,Y,Z),W,TempEnv3,NewEnv).
eval_for(t_for1(W,X,Y,Z),Env,NewEnv) :- eval_identifier(W,A),eval_int(X,Value1),update(A,Value1,int,Env,TempEnv1),lookup(A,TempEnv1,Value),eval_int(Y,Value2),Value1>Value2,Value=<Value1,Value>Value2,eval_block(Z,TempEnv1,TempEnv2),NewR is Value-1,update(A,NewR,int,TempEnv2,TempEnv3),eval_for(t_for1(W,X,Y,Z),W,TempEnv3,NewEnv).
eval_for(t_for1(_,X,Y,_),Env,Env) :- eval_int(X,Value1),eval_int(Y,Value2),Value1=Value2.
eval_for(t_for1(W,X,Y,Z),W,Env,NewEnv) :- eval_identifier(W,R),lookup(R,Env,Value),eval_int(X,Value1),eval_int(Y,Value2),Value1>Value2,Value=<Value1,Value>Value2,eval_block(Z,Env,TempEnv1),NewR is Value-1,write(NewR),update(R,NewR,int,TempEnv1,TempEnv2),write(NewR),eval_for(t_for1(W,X,Y,Z),W,TempEnv2,NewEnv).
eval_for(t_for1(W,X,Y,Z),W,Env,NewEnv) :- eval_identifier(W,R),eval_int(X,Value1),lookup(R,Env,Value),eval_int(Y,Value2),Value1<Value2,Value>=Value1,Value<Value2,eval_block(Z,Env,TempEnv1),NewR is Value+1,update(R,NewR,int,TempEnv1,TempEnv2),eval_for(t_for1(W,X,Y,Z),W,TempEnv2,
NewEnv).
eval_for(t_for1(W,X,Y,_),W,Env,Env) :-eval_identifier(W,R), eval_int(X,_),lookup(R,Env,Value),eval_int(Y,Value2),Value=Value2.
eval_for(t_for1id(W,X,Y,Z),Env,NewEnv) :- eval_identifier(W,A),eval_identifier(X,X1),lookup(X1,Env,Value1),update(A,Value1,int,Env,Env1),lookup(A,Env1,Value),eval_identifier(Y,Y1),lookup(Y1,Env1,Value2),Value1<Value2,Value>=Value1,Value<Value2,eval_block(Z,Env1,Env2),NewValue is Value+1,update(A,NewValue,int,Env2,Env3),eval_for(t_for1id(W,X,Y,Z),W,Env3,NewEnv).
eval_for(t_for1id(W,X,Y,Z),Env,NewEnv) :- eval_identifier(W,A),eval_identifier(X,X1),lookup(X1,Env,Value1),update(A,Value1,int,Env,Env1),lookup(A,Env1,Value),eval_identifier(Y,Y1),lookup(Y1,Env1,Value2),Value1>Value2,Value=<Value1,Value>Value2,eval_block(Z,Env1,Env2),NewValue is Value-1,update(A,NewValue,int,Env2,Env3),eval_for(t_for1id(W,X,Y,Z),W,Env3,NewEnv).
eval_for(t_for1id(_,X,Y,_),Env,Env) :- eval_identifier(X,X1),lookup(X1,Env,Value1),eval_identifier(Y,Y1),lookup(Y1,Env,Value2),Value1=Value2.
eval_for(t_for1id(W,X,Y,Z),W,Env,NewEnv) :- eval_identifier(W,A),lookup(A,Env,Value),eval_identifier(X,X1),lookup(X1,Env,Value1),eval_identifier(Y,Y1),lookup(Y1,Env,Value2),Value1>Value2,Value=<Value1,Value>Value2,eval_block(Z,Env,TempEnv1),NewR is Value-1,update(A,NewR,int,TempEnv1,TempEnv2),eval_for(t_for1id(W,X,Y,Z),W,TempEnv2,NewEnv).
eval_for(t_for1id(W,X,Y,Z),W,Env,NewEnv) :- eval_identifier(W,R),eval_identifier(X,X1),lookup(X1,Env,Value1),lookup(R,Env,Value),eval_identifier(Y,Y1),lookup(Y1,Env,Value2),Value1<Value2,Value>=Value1,Value<Value2,eval_block(Z,Env,TempEnv1),NewR is Value+1,update(R,NewR,int,TempEnv1,TempEnv2),eval_for(t_for1id(W,X,Y,Z),W,TempEnv2,NewEnv).
eval_for(t_for1id(W,X,Y,_),W,Env,Env) :- eval_identifier(W,R),eval_identifier(X,X1),lookup(X1,Env,_),lookup(R,Env,Value),eval_identifier(Y,Y1),lookup(Y1,Env,Value2),Value=Value2.

%evalutaion for if loop.
eval_if(t_if(X,Y,_),Env,NewEnv) :- eval_boolean(X,Env,TempEnv1,Value),Value=true,eval_block(Y,TempEnv1,NewEnv).
eval_if(t_if(X,_,Z),Env,NewEnv) :- eval_boolean(X,Env,TempEnv1,Value),Value=false,eval_block(Z,TempEnv1,NewEnv).
eval_if(t_ifelse(X,Y,_),Env,NewEnv) :- eval_boolean(X,Env,TempEnv1,Value),Value=true,eval_block(Y,TempEnv1,NewEnv).
eval_if(t_ifelse(X,_,Z),Env,NewEnv) :- eval_boolean(X,Env,TempEnv1,Value),Value=false,eval_elseif(Z,TempEnv1,NewEnv).
eval_elseif(t_elseif1(X,Y,_),Env,NewEnv) :- eval_boolean(X,Env,TempEnv1,Value),Value=true,eval_block(Y,TempEnv1,NewEnv).
eval_elseif(t_elseif1(X,_,Z),Env,NewEnv) :- eval_boolean(X,Env,TempEnv1,Value),Value=false,eval_block(Z,TempEnv1,NewEnv).
eval_elseif(t_elseif2(X,Y,_),Env,NewEnv) :- eval_boolean(X,Env,TempEnv1,Value),Value=true,eval_block(Y,TempEnv1,NewEnv).
eval_elseif(t_elseif2(X,_,Z),Env,NewEnv) :- eval_boolean(X,Env,TempEnv1,Value),Value=false,eval_elseif(Z,TempEnv1,NewEnv).
eval_elseif(t_elseif3(empty),Env,Env).

%evalutaion for print statements.
eval_print(t_print(X),Env) :- eval_statement(X,Env).
eval_print(t_print(empty),_) :- write("").
eval_statement(t_statement(X,Y),Env) :- eval_statement1(X,Env),eval_statement(Y,Env).
eval_statement(t_statement(X),Env) :- eval_statement1(X,Env).
eval_statement1(t_statementStr(X),_) :- eval_string(X,T),write(T).
eval_statement1(t_statementIdent(X),Env) :- eval_identifier(X,T),lookup(T,Env,Value),write(Value).
eval_statement1(t_statementNewline(line),_) :-nl.

%evalutaion for unary operators
eval_unaryoperator(t_incr(X),Env,NewEnv) :- eval_identifier(X, Value),lookup(Value,Env,Value1), NewR is Value1+1,update(Value,NewR,int,Env,NewEnv).
eval_unaryoperator(t_decr(X),Env,NewEnv) :- eval_identifier(X, Value),lookup(Value,Env,Value1), NewR is Value1-1,update(Value,NewR,int,Env,NewEnv).

%evalutaion for boolean functions.
eval_boolean(t_boolean(true),Env,Env,true).
eval_boolean(t_boolean(false),Env,Env,false).
eval_boolean(t_booleanExpr(X,Y),Env,NewEnv,true) :- eval_expression(X,Env,TempEnv1,Value1),eval_expression(Y,TempEnv1,NewEnv,Value2),Value1 = Value2.
eval_boolean(t_booleanExpr(X,Y),Env,NewEnv,false) :- eval_expression(X,Env,TempEnv1,Value1),eval_expression(Y,TempEnv1,NewEnv,Value2),Value1 \= Value2.
eval_boolean(t_booleanNot(X),Env,NewEnv,false) :- eval_boolean(X,Env,NewEnv,Value),Value=true.
eval_boolean(t_booleanNot(X),Env,NewEnv,true) :- eval_boolean(X,Env,NewEnv,Value),Value=false.
eval_boolean(t_booleanLesThan(X,Y),Env,NewEnv,true) :- eval_expression(X,Env,TempEnv1,Value1),eval_expression(Y,TempEnv1,NewEnv,Value2),Value1 < Value2.
eval_boolean(t_booleanLesThan(X,Y),Env,NewEnv,false) :- eval_expression(X,Env,TempEnv1,Value1),eval_expression(Y,TempEnv1,NewEnv,Value2),Value1 >= Value2.
eval_boolean(t_booleanGrtThan(X,Y),Env,NewEnv,true) :- eval_expression(X,Env,TempEnv1,Value1),eval_expression(Y,TempEnv1,NewEnv,Value2),Value1 > Value2.
eval_boolean(t_booleanGrtThan(X,Y),Env,NewEnv,false) :- eval_expression(X,Env,TempEnv1,Value1),eval_expression(Y,TempEnv1,NewEnv,Value2),Value1 =< Value2.
eval_boolean(t_booleanGrtEql(X,Y),Env,NewEnv,true) :- eval_expression(X,Env,TempEnv1,Value1),eval_expression(Y,TempEnv1,NewEnv,Value2),Value1 >= Value2.
eval_boolean(t_booleanGrtEql(X,Y),Env,NewEnv,false) :- eval_expression(X,Env,TempEnv1,Value1),eval_expression(Y,TempEnv1,NewEnv,Value2),Value1 < Value2.
eval_boolean(t_booleanLesEql(X,Y),Env,NewEnv,true) :- eval_expression(X,Env,TempEnv1,Value1),eval_expression(Y,TempEnv1,NewEnv,Value2),Value1 =< Value2.
eval_boolean(t_booleanLesEql(X,Y),Env,NewEnv,false) :- eval_expression(X,Env,TempEnv1,Value1),eval_expression(Y,TempEnv1,NewEnv,Value2),Value1 > Value2.
eval_boolean(t_booleanExpr(_),Env,Env,true).
eval_boolean(t_booleanOr(X,Y),Env,Env,Value) :- eval_boolean(X,Env,Env,Value1), eval_boolean(Y,Env,Env,Value2), eval_or(Value1,Value2,Value).
eval_boolean(t_booleanAnd(X,Y),Env,Env,Value) :- eval_boolean(X,Env,Env,Value1), eval_boolean(Y,Env,Env,Value2), eval_and(Value1,Value2,Value).
eval_boolean(t_boolean1(X),X).

%evalutaion for 'and' and 'or'
eval_or(true,_,true).
eval_or(_,true,true).
eval_or(false,false,false).
eval_and(false,_,false).
eval_and(_,false,false).
eval_and(true,true,true).

%evalutaion for expressions and arithmetic expressions.
eval_expression(t_addition(X,Y),Env,NewEnv,Value) :- eval_expression(X,Env,TempEnv1,Value1),eval_sub_term(Y,TempEnv1,NewEnv,Value2), Value is Value1+Value2.
eval_expression(X,Env,TempEnv1,Value1) :- eval_sub_term(X,Env,TempEnv1,Value1).
eval_sub_term(t_subtraction(X,Y),Env,NewEnv,Value) :- eval_sub_term(X,Env,TempEnv1,Value1),eval_mult_term(Y,TempEnv1,NewEnv,Value2), Value is Value1-Value2.
eval_sub_term(X,Env,TempEnv1,Value) :- eval_mult_term(X,Env,TempEnv1,Value).
eval_mult_term(t_multiplication(X,Y),Env,NewEnv,Value) :- eval_mult_term(X,Env,TempEnv1,Value1),eval_div_term(Y,TempEnv1,NewEnv,Value2), Value is Value1*Value2.
eval_mult_term(X,Env,TempEnv1,Value) :- eval_div_term(X,Env,TempEnv1,Value).
eval_div_term(t_division(X,Y),Env,NewEnv,Value) :- eval_div_term(X,Env,TempEnv1,Value1),eval_mod_term(Y,TempEnv1,NewEnv,Value2), Value is Value1*Value2.
eval_div_term(X,Env,TempEnv1,Value) :- eval_mod_term(X,Env,TempEnv1,Value).
eval_mod_term(t_modulo(X,Y),Env,NewEnv,Value) :- eval_mod_term(X,Env,TempEnv1,Value1),eval_factor_term(Y,TempEnv1,NewEnv,Value2), Value is rem(Value1,Value2).
eval_mod_term(X,Env,NewEnv,Value) :- eval_factor_term(X,Env,NewEnv,Value).
eval_factor_term(t_assignment(X,Y),Env,NewEnv,Value) :- eval_identifier(X,R),eval_expression(Y,Env,TempEnv,Value),update(R,Value,int,TempEnv,NewEnv).
eval_factor_term(X,Env,NewEnv,Value) :- eval_factor_term(X,Env,NewEnv,Value).
eval_factor_term(t_parenthesis(X),Env,NewEnv,Value) :- eval_expression(X,Env,NewEnv,Value).
eval_factor_term(X,Env,NewEnv,Value) :- eval_factor_term(X,Env,NewEnv,Value).
eval_factor_term(t_ternary(X),Env,NewEnv,Value) :- eval_ternary(X,Env,NewEnv,Value).
eval_factor_term(X,Env,NewEnv,Value) :- eval_term(X,Env,NewEnv,Value).
eval_term(X,Env,Env,Value) :- eval_double(X,Value).
eval_term(X,Env,Env,Value) :- eval_identifier(X,R),lookup(R,Env,Value).

%evalutaion for Data types
eval_string(t_Str(X),X) .
eval_double(t_numb(X),X).
eval_identifier(t_identifier(X),X).
eval_int(t_int(X),X).
eval_float(t_float(X),X).

%evalutaion for lookup and update
lookup(Id,[],_Value):-write(Id),write(" not found"),fail.
lookup(Variable,[(Variable,Y,_)|_],Y).
lookup(Variable,[(X,_,_)|T],R):- Variable \= X,lookup(Variable,T,R).

update(Id,Value,Type,[],[(Id,Value,Type)]).
update(Id,Value,int,[(Id,_,float)|T],[(Id,Value,float)|T]).
update(Id,Value,float,[(Id,_,double)|T],[(Id,Value,double)|T]).
update(Id,Value,int,[(Id,_,double)|T],[(Id,Value,double)|T]).
update(Id,Value,Type,[(Id,_,Type)|T],[(Id,Value,Type)|T]).
update(Id,Value,Type,[H|T],[H|R]):- H\=(Id,_),update(Id,Value,Type,T,R).


