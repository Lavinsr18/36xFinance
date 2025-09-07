// Excel export utilities for contact and enquiry data
import type { Contact, EnquiryForm } from "@shared/schema";

export interface ExportOptions {
  filename?: string;
  sheetName?: string;
}

class ExcelExportService {
  // Export contacts to CSV (Excel compatible)
  async exportContacts(
    contacts: Contact[],
    options: ExportOptions = {}
  ): Promise<void> {
    try {
      const filename = options.filename || `contacts_${new Date().toISOString().split('T')[0]}.csv`;
      
      // CSV headers
      const headers = [
        "First Name",
        "Last Name", 
        "Email",
        "Phone",
        "Subject",
        "Message",
        "Date Submitted"
      ];

      // Convert contacts to CSV rows
      const csvRows = contacts.map(contact => [
        this.escapeCsvValue(contact.firstName),
        this.escapeCsvValue(contact.lastName),
        this.escapeCsvValue(contact.email),
        this.escapeCsvValue(contact.phone || ""),
        this.escapeCsvValue(contact.subject),
        this.escapeCsvValue(contact.message),
        contact.createdAt ? new Date(contact.createdAt).toLocaleString() : ""
      ]);

      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...csvRows.map(row => row.join(","))
      ].join("\n");

      // Download file
      this.downloadFile(csvContent, filename, "text/csv");
      
    } catch (error) {
      console.error("Error exporting contacts:", error);
      throw new Error("Failed to export contacts");
    }
  }

  // Export enquiry forms to CSV
  async exportEnquiryForms(
    forms: EnquiryForm[],
    options: ExportOptions = {}
  ): Promise<void> {
    try {
      const filename = options.filename || `enquiry_forms_${new Date().toISOString().split('T')[0]}.csv`;
      
      // CSV headers
      const headers = [
        "Title",
        "Description",
        "Icon",
        "Image URL",
        "Google Form URL",
        "Features",
        "Status",
        "Created Date"
      ];

      // Convert forms to CSV rows
      const csvRows = forms.map(form => [
        this.escapeCsvValue(form.title),
        this.escapeCsvValue(form.description),
        this.escapeCsvValue(form.icon),
        this.escapeCsvValue(form.image || ""),
        this.escapeCsvValue(form.googleFormUrl),
        this.escapeCsvValue(form.features?.join("; ") || ""),
        form.isActive ? "Active" : "Inactive",
        form.createdAt ? new Date(form.createdAt).toLocaleString() : ""
      ]);

      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...csvRows.map(row => row.join(","))
      ].join("\n");

      // Download file
      this.downloadFile(csvContent, filename, "text/csv");
      
    } catch (error) {
      console.error("Error exporting enquiry forms:", error);
      throw new Error("Failed to export enquiry forms");
    }
  }

  // Export data with custom structure
  async exportCustomData(
    data: Record<string, any>[],
    headers: string[],
    filename: string
  ): Promise<void> {
    try {
      // Convert data to CSV rows
      const csvRows = data.map(item => 
        headers.map(header => {
          const value = item[header] || "";
          return this.escapeCsvValue(String(value));
        })
      );

      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...csvRows.map(row => row.join(","))
      ].join("\n");

      // Download file
      this.downloadFile(csvContent, filename, "text/csv");
      
    } catch (error) {
      console.error("Error exporting custom data:", error);
      throw new Error("Failed to export data");
    }
  }

  // Fetch and export contacts from API
  async fetchAndExportContacts(): Promise<void> {
    try {
      const response = await fetch("/api/export/contacts");
      
      if (!response.ok) {
        throw new Error("Failed to fetch contact data");
      }

      // Get the CSV content from the response
      const csvContent = await response.text();
      
      // Create filename with current date
      const filename = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
      
      // Download the file
      this.downloadFile(csvContent, filename, "text/csv");
      
    } catch (error) {
      console.error("Error fetching and exporting contacts:", error);
      throw new Error("Failed to export contacts");
    }
  }

  // Fetch and export enquiry forms from API
  async fetchAndExportEnquiries(): Promise<void> {
    try {
      const response = await fetch("/api/export/enquiries");
      
      if (!response.ok) {
        throw new Error("Failed to fetch enquiry data");
      }

      // Get the CSV content from the response
      const csvContent = await response.text();
      
      // Create filename with current date
      const filename = `enquiry_forms_${new Date().toISOString().split('T')[0]}.csv`;
      
      // Download the file
      this.downloadFile(csvContent, filename, "text/csv");
      
    } catch (error) {
      console.error("Error fetching and exporting enquiries:", error);
      throw new Error("Failed to export enquiry forms");
    }
  }

  // Helper method to escape CSV values
  private escapeCsvValue(value: string): string {
    // Handle empty values
    if (!value) return '""';
    
    // Convert to string and handle special characters
    const stringValue = String(value);
    
    // If the value contains comma, newline, or quote, wrap in quotes and escape quotes
    if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return `"${stringValue}"`;
  }

  // Helper method to download file
  private downloadFile(content: string, filename: string, mimeType: string): void {
    try {
      // Create blob with BOM for proper Excel UTF-8 support
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + content], { type: `${mimeType};charset=utf-8` });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error downloading file:", error);
      throw new Error("Failed to download file");
    }
  }

  // Generate summary report
  async generateSummaryReport(data: {
    contacts: Contact[];
    enquiryForms: EnquiryForm[];
  }): Promise<void> {
    try {
      const filename = `36x_finance_summary_${new Date().toISOString().split('T')[0]}.csv`;
      
      // Create summary data
      const summaryData = [
        ["Metric", "Count", "Details"],
        ["Total Contacts", data.contacts.length.toString(), "Number of contact form submissions"],
        ["Total Enquiry Forms", data.enquiryForms.length.toString(), "Number of active enquiry forms"],
        ["Active Forms", data.enquiryForms.filter(f => f.isActive).length.toString(), "Currently active enquiry forms"],
        ["Recent Contacts (7 days)", this.getRecentContactsCount(data.contacts, 7).toString(), "Contacts submitted in last 7 days"],
        ["Recent Contacts (30 days)", this.getRecentContactsCount(data.contacts, 30).toString(), "Contacts submitted in last 30 days"],
        ["", "", ""],
        ["Export Date", new Date().toLocaleString(), "When this report was generated"],
      ];

      // Create CSV content
      const csvContent = summaryData.map(row => 
        row.map(cell => this.escapeCsvValue(cell)).join(",")
      ).join("\n");

      // Download file
      this.downloadFile(csvContent, filename, "text/csv");
      
    } catch (error) {
      console.error("Error generating summary report:", error);
      throw new Error("Failed to generate summary report");
    }
  }

  // Helper to count recent contacts
  private getRecentContactsCount(contacts: Contact[], days: number): number {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return contacts.filter(contact => 
      contact.createdAt && new Date(contact.createdAt) >= cutoffDate
    ).length;
  }
}

export const excelExportService = new ExcelExportService();

// Convenience exports
export const exportContacts = excelExportService.exportContacts.bind(excelExportService);
export const exportEnquiryForms = excelExportService.exportEnquiryForms.bind(excelExportService);
export const exportCustomData = excelExportService.exportCustomData.bind(excelExportService);
export const fetchAndExportContacts = excelExportService.fetchAndExportContacts.bind(excelExportService);
export const fetchAndExportEnquiries = excelExportService.fetchAndExportEnquiries.bind(excelExportService);
export const generateSummaryReport = excelExportService.generateSummaryReport.bind(excelExportService);
