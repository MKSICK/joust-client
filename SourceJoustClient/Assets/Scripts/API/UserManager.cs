using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Net;
using System.IO;
using UnityEngine.UI;

public class UserManager : MonoBehaviour
{
    public InputField NameField;
    public InputField LoginField;
    public InputField PasswordField;

    public GameObject[] LoginForm;
    public GameObject[] RegisterForm;

    public MessageBox messageBox;

    public void SetActiveArray(GameObject[] array, bool state)
    {
        foreach(GameObject obj in array)
        {
            obj.SetActive(state);
        }
    }

    class UserSendData
    {
        public string name;
        public string login;
        public string password;
        public int type;
    }

    public void ShowForm(string form)
    {
        switch(form)
        {
            case "Login":
                SetActiveArray(RegisterForm, false);
                SetActiveArray(LoginForm, true);
                break;
            case "Register":
                SetActiveArray(LoginForm, false);
                SetActiveArray(RegisterForm, true);
                break;
        }
    }

    public void Register()
    {
        StartCoroutine(UserCreate());
    }

    public void Auth()
    {
        StartCoroutine(UserAuth());
    }

    public IEnumerator UserCreate()
    {
        string url = Global.API_URL + "/user/create";

        var request = WebRequest.Create(url);
        request.ContentType = "application/json";

        request.Method = "POST";

        UserSendData data = new UserSendData();

        data.name = NameField.text;
        data.login = LoginField.text;
        data.password = PasswordField.text;
        data.type = 2;

        using (var streamWriter = new StreamWriter(request.GetRequestStream()))
        {
            string json = JsonUtility.ToJson(data);
            streamWriter.Write(json);
        }

        HttpWebResponse response = request.GetResponse() as HttpWebResponse;
        using (Stream responseStream = response.GetResponseStream())
        {
            StreamReader reader = new StreamReader(responseStream);
            UserResponse userResponse = JsonUtility.FromJson<UserResponse>(reader.ReadLine());

            Global.USER_ID = userResponse.user.id;
            Global.USER_NAME = userResponse.user.name;
            Global.USER_LOGIN = LoginField.text;
            messageBox.gameObject.SetActive(true);
            messageBox.Setup(userResponse, response.StatusCode);
        }
        yield return null;
    }

    public IEnumerator UserAuth()
    {
        string url = Global.API_URL + "/user/auth";

        var request = WebRequest.Create(url);
        request.ContentType = "application/json";

        request.Method = "POST";

        UserSendData data = new UserSendData();
        
        data.login = LoginField.text;
        data.password = PasswordField.text;

        using (var streamWriter = new StreamWriter(request.GetRequestStream()))
        {
            string json = JsonUtility.ToJson(data);
            streamWriter.Write(json);
        }

        HttpWebResponse response = request.GetResponse() as HttpWebResponse;
        using (Stream responseStream = response.GetResponseStream())
        {
            StreamReader reader = new StreamReader(responseStream);
            UserResponse userResponse = JsonUtility.FromJson<UserResponse>(reader.ReadLine());

            Global.USER_ID = userResponse.user.id;
            Global.USER_NAME = userResponse.user.name;
            Global.USER_LOGIN = LoginField.text;
            messageBox.gameObject.SetActive(true);
            messageBox.Setup(userResponse, response.StatusCode);
        }
        yield return null;
    }


}
