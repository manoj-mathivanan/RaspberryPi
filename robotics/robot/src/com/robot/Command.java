package com.robot;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Command {

	public static void execute(String command)
	{
		try{
		String[] cmd = {
				"/bin/sh",
				"-c",
				command
		};
		Process p = Runtime.getRuntime().exec(cmd);
		BufferedReader in = new BufferedReader(
				new InputStreamReader(p.getInputStream()));
		while ((in.readLine()) != null) {
		}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
}
