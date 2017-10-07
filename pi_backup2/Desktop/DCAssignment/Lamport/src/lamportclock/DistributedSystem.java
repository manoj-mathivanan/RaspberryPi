package lamportclock;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lamportclock.event.Event;
import lamportclock.node.NodeLock;
import lamportclock.node.NodeThread;

/* Author : Praveen Kumar
 * BITS ID: 2015ht12227
 */

public class DistributedSystem {

	private static final String RECEIVE = "R";
	private static final String SEND = "S";
	public static final String LOCAL = "L";
	/*
	 * create node clocks for handling the send recieve functionality using
	 * inter-node communication by assigning a lock for each node
	 */
	public static Map<Integer, NodeLock> nodelocks = new HashMap<Integer, NodeLock>();

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		List<Thread> nodeList = new ArrayList<Thread>();
		List<String[]> inputEventList = new ArrayList<String[]>();
		try {
			System.out
					.println("Please provide input in this format: L,L,L,S,R-2,S \n"
							+ "L: Local event\n"
							+ "S: Send event\n"
							+ "R: Receive event. eg: (R-2 indicates node 2 as the event sender)\n");
			int i = 0;
			while (i < 3) {
				BufferedReader br = new BufferedReader(new InputStreamReader(
						System.in));
					System.out.print("Enter the events for the node " + (i + 1) + ": ");
					br = new BufferedReader(new InputStreamReader(System.in));
					String eventString = br.readLine();
					inputEventList.add(eventString.split(","));
				i++;
			}
		} catch (IOException ioe) {
			System.out.println("IO error trying to read your input!");
			System.exit(1);
		}
		/*
		 * Each node is represented as a thread here. Based on the input the
		 * nodes are created, then the node events are added to each node.
		 */

		 for (int j = 1; j <= inputEventList.size(); j++) {
		 createNode(j, inputEventList.get(j - 1), nodeList);
		 }

		for (Thread thread : nodeList) {
			thread.start();
		}

	}

	private static void createNode(int nodeNumber, String[] node1Events,
			List<Thread> nodeList) {
		NodeThread node = new NodeThread(nodeNumber);
		Thread nodeThread = new Thread(node, "Node1Thread");
		nodeList.add(nodeThread);
		nodelocks.put(nodeNumber, new NodeLock());
		for (String event : node1Events) {
			if (event.equals(LOCAL)) {
				node.getEventList().add(new Event(0, -1, -1));
			} else if (event.startsWith(SEND)) {
				node.getEventList().add(new Event(1, nodeNumber, -1));
			} else if (event.startsWith(RECEIVE)) {
				Integer senderNodeNumber = Integer
						.parseInt(event.split("-")[1]);
				node.getEventList().add(new Event(2, senderNodeNumber, -1));
			}
		}
	}
}
