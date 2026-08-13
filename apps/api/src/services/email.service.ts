import nodemailer from "nodemailer";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  async sendRepairRequestCreatedEmail({
    to,
    customerName,
    ticketNumber,
  }: {
    to: string;
    customerName: string;
    ticketNumber: string;
  }) {
    await this.transporter.sendMail({
      from: `"RepairDesk Bohol" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Repair Request Received - RepairDesk Bohol",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Repair Request Received</h2>

          <p>Hello ${customerName},</p>

          <p>
            We have successfully received your repair request.
          </p>

          <h3>Your Ticket Number</h3>

          <p style="font-size: 20px; font-weight: bold;">
            ${ticketNumber}
          </p>

          <p>
            Please keep this ticket number. You will need it together
            with your phone number to track your repair request.
          </p>
          <p>
            Use this link to track your progress.
          </p>
          <p>
            http://localhost:5173/track
          <p>

          <p>
            Thank you for using RepairDesk Bohol.
          </p>

          <p>
            — RepairDesk Bohol
          </p>
        </div>
      `,
    });
  }

    async sendRepairStatusUpdatedEmail({
        to,
        customerName,
        ticketNumber,
        status,
        note,
    }: {
        to: string;
        customerName: string;
        ticketNumber: string;
        status: string;
        note?: string;
    }) {
        const statusLabels: Record<string, string> = {
            PENDING_REVIEW: "Pending Review",
            ACCEPTED: "Accepted",
            IN_PROGRESS: "In Progress",
            WAITING_PARTS: "Waiting for Parts",
            READY_FOR_PICKUP: "Ready for Pickup",
            COMPLETED: "Completed",
            CANCELLED: "Cancelled",
        };

        const statusLabel = statusLabels[status] ?? status;

        await this.transporter.sendMail({
            from: `"RepairDesk Bohol" <${process.env.GMAIL_USER}>`,
            to,
            subject: `Repair Status Updated - ${ticketNumber}`,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Repair Status Updated</h2>

                <p>Hello ${customerName},</p>

                <p>
                The status of your repair request has been updated.
                </p>

                <h3>Ticket Number</h3>

                <p style="font-size: 20px; font-weight: bold;">
                ${ticketNumber}
                </p>

                <h3>New Status</h3>

                <p style="font-size: 18px; font-weight: bold;">
                ${statusLabel}
                </p>

                ${
                note
                    ? `
                    <h3>Note</h3>
                    <p>${note}</p>
                    `
                    : ""
                }

                <p>
                You can use your ticket number and phone number
                to track your repair request.
                </p>

                <p>
                Thank you for using RepairDesk Bohol.
                </p>

                <p>
                — RepairDesk Bohol
                </p>
            </div>
            `,
        });
    }
}

export const emailService = new EmailService();