package lamportclock.clock;

/* Author : Praveen Kumar
 * BITS ID: 2015ht12227
 */

public class LamportClock {
	private int timeValue = 0;

	public int getTimeValue() {
		return timeValue;
	}

	public void setTimeValue(int timeValue) {
		this.timeValue = timeValue;
	}

	public void incrementTime() {
		this.timeValue++;
	}
}
