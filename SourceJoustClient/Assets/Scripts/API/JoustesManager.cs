using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Net;
using System.IO;

public static class Global
{
    public static string API_HOST = "http://188.93.210.105";
    public static string API_PORT = "1400";
    public static string API_URL { get { return API_HOST + ":" + API_PORT; } }

    public static int USER_ID;
    public static string USER_NAME;
    public static string USER_LOGIN;
    public static string USER_PASSWORD;
}

public class JoustesManager : MonoBehaviour
{
    public JoustesResponse joustesResponse;
    public void Start()
    {
        Debug.Log(Global.API_URL);
    }

    public void GetAllJoustes()
    {
        StartCoroutine(JoustGetAll());
    }

    public IEnumerator JoustGetAll()
    {
        string url = Global.API_URL + "/joust/getall";

        var request = WebRequest.Create(url);
        request.ContentType = "application/json";

        request.Method = "GET";

        HttpWebResponse response = request.GetResponse() as HttpWebResponse;
        using (Stream responseStream = response.GetResponseStream())
        {
            StreamReader reader = new StreamReader(responseStream);
            joustesResponse = JsonUtility.FromJson<JoustesResponse>(reader.ReadLine());
            Debug.Log(1);
        }
        yield return null;
    }
}

[System.Serializable]
public class ScrollViewHandler
{
    public GameObject prefab;
    public RectTransform content;

    public void UpdateJoustes(JoustView[] ObjectList)
    {
        ClearContent();
        foreach (JoustView obj in ObjectList)
        {
            GameObject clone = GameObject.Instantiate<GameObject>(prefab, content);
            //clone.GetComponent<SessionViewContainer>().Setup(obj);
        }
    }

    public void ClearContent()
    {
        foreach (RectTransform child in content)
        {
            GameObject.Destroy(child.gameObject);
        }
    }
}
