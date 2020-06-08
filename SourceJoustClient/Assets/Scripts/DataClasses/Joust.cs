using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;


public class StandartResponse
{
    public string message;
}

[Serializable]
public class UserResponse : StandartResponse
{
    public User user;
}

[Serializable]
public class User
{
    public int id;
    public string name;
}

[Serializable]
public class JoustesResponse
{
    public JoustView[] joustes;
}

[Serializable]
public class JoustView
{
    public int id;
    public int type;
    public string name;
    public string description;
    public int created_by;
    public int winner;
    public string location;
    public string date_start;
    public string date_end;
    public int status;
    public string winner_name;
}

[Serializable]
public class JoustResponse
{
    public Joust joust;
}

[Serializable]
public class Joust
{
    public int id;
    public int type;
    public string name;
    public string description;
    public int created_by;
    public int winner;
    public string location;
    public string date_start;
    public string date_end;
    public int status;
    public string winner_name;
    public Copmetition[] copmetitions;
    public Attendee[] attendees;
}

[Serializable]
public class Copmetition
{
    public int id;
    public int joust_id;
    public string description;
    public string date_start;
    public string date_end;
    public int member1;
    public int member2;
    public int winner;
    public int status;
    public int stage;
    public string m1_name;
    public string m2_name;
    public string winner_name;
}

[Serializable]
public class Attendee
{
    public int user_id;
    public string name;
    public int score;
}
