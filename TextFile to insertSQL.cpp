//progmra: textfiletosqlite3insert
//author: Brian Chamberlain
//date:2.22.2022
//goal: take file as getline into insert statement to copy paste into db

#include <iostream>
#include <fstream>
#include<string>

using namespace std;

int main(){

	string insertST;// = "insert into ALLWORDS values(\'";
string data;
int i;

ifstream textFile;
ostream o;
textFile.open("steno_data.txt");
o.open("SQLinsertSTATMENTS")//text file for easy transport and copypaste into db browser ionitiail commit log file

if (textFile.is_open()){
	i = 0; //changes words' id#  set to zero now
	while (!textFile.eof()){
		
		 getline(textFile, data);
		
		insertST = "insert into ALLWORDS values(\'";//change table name to proper name
		insertST += to_string(i);
		insertST += "\', \"";
		insertST += data;
		insertST += "\", 'Test', \"";
		insertST += "2.22.2022\");"  ; //change date to sqlite3 date style this is a placeholder
		
		cout << insertST.c_str() << endl;
		o << insertST << endl;
		i++;

	}
	//	insert into ALLWORDS values('00001', " they can", "Test", "2.22.2022");
	//  insert into ALLWORDS values('00002', " they can't", "Test", "2.22.2022");
	cout << endl;

}

	else { cout << "textFile not opened." << endl; }

textFile.close();
o.close();

return 0;
}

//example insert:
//insert into PLAYER values("      Kyle Bris              ", '11', "Knicks");