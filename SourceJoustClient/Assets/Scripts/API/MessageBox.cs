using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Net;
using UnityEngine.Events;
using UnityEngine.UI;

public class MessageBox : MonoBehaviour
{
    public StandartResponse Resp;

    public UnityEvent Function;
    public UnityEvent SuccessFunctions;
    public UnityEvent FailFunctions;

    public Text MessageText;

    HttpStatusCode code;

    public void Setup(StandartResponse resp, HttpStatusCode code)
    {
        this.Resp = resp;
        MessageText.text = Resp.message;
        this.code = code;
    }

    public void CallFunction()
    {
        Function.Invoke();
        switch (code)
        {
            case HttpStatusCode.OK:
                SuccessFunctions.Invoke();
                break;
            default:
                FailFunctions.Invoke();
                break;
        }
    }
}
