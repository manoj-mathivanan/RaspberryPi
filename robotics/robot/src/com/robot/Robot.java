package com.robot;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@WebServlet("/drive")
public class Robot extends HttpServlet {
	
	
	@Override
	public void init() throws ServletException {
		super.init();
		Command.execute("gpio mode 0 out");
		Command.execute("gpio mode 1 out");
		Command.execute("gpio mode 3 out");
		Command.execute("gpio mode 4 out");
		Command.execute("gpio write 1 0");
		Command.execute("gpio write 3 0");
		Command.execute("gpio write 0 0");
		Command.execute("gpio write 4 0");
		Command.execute("gpio write 1 1");
		Command.execute("gpio write 4 1");
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		Command.execute("gpio write 1 0");
		Command.execute("gpio write 3 0");
		Command.execute("gpio write 0 0");
		Command.execute("gpio write 4 0");
		
	}

	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.getWriter().println("works1");
	}

	private static final long serialVersionUID = 1L;

	public Robot() {
		super();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//response.addHeader("Access-Control-Allow-Origin", "*");
		String body = getBody(request);
		try{
			JSONParser parser = new JSONParser();
			JSONArray route = (JSONArray)((JSONObject)parser.parse(body)).get("route");
			long power = Long.parseLong(request.getHeader("power"));
			for(int i=0;i<route.size();i++)
			{
				JSONParser parser2 = new JSONParser();
				String direction = ((JSONObject)parser2.parse(route.get(i).toString())).get("direction").toString();
				String rotations = ((JSONObject)parser2.parse(route.get(i).toString())).get("rotations").toString();
				System.out.println(direction + " " + rotations);
				if(direction.compareToIgnoreCase("forward")==0)
				{
					Command.execute("gpio write 1 1");
					Command.execute("gpio write 3 1");
					Thread.sleep(Long.parseLong(rotations)*power);
				}
				else if(direction.compareToIgnoreCase("left")==0)
				{
					Command.execute("gpio write 1 1");
					Thread.sleep(Long.parseLong(rotations)*power);
				}
				else if(direction.compareToIgnoreCase("right")==0)
				{
					Command.execute("gpio write 3 1");
					Thread.sleep(Long.parseLong(rotations)*power);
				}
				else if(direction.compareToIgnoreCase("back")==0)
				{
					Command.execute("gpio write 0 1");
					Command.execute("gpio write 4 1");
					Thread.sleep(Long.parseLong(rotations)*power);
				}
				else if(direction.compareToIgnoreCase("rotate")==0)
				{
					Command.execute("gpio write 1 1");
					Command.execute("gpio write 4 1");
					Thread.sleep(Long.parseLong(rotations)*power);
				}
				Command.execute("gpio write 1 0");
				Command.execute("gpio write 3 0");
				Command.execute("gpio write 0 0");
				Command.execute("gpio write 4 0");
			}
			
			response.getWriter().println("Done");
		}catch(Exception e)
		{
			response.getWriter().println(e.getMessage());
			e.printStackTrace();
		}
	}

	public static String getBody(HttpServletRequest request) throws IOException {

		String body = null;
		StringBuilder stringBuilder = new StringBuilder();
		BufferedReader bufferedReader = null;

		try {
			InputStream inputStream = request.getInputStream();
			if (inputStream != null) {
				bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
				char[] charBuffer = new char[128];
				int bytesRead = -1;
				while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
					stringBuilder.append(charBuffer, 0, bytesRead);
				}
			} else {
				stringBuilder.append("");
			}
		} catch (IOException ex) {
			throw ex;
		} finally {
			if (bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (IOException ex) {
					throw ex;
				}
			}
		}

		body = stringBuilder.toString();
		return body;
	}

}
