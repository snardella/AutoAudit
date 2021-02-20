# AutoAudit

AutoAudit is an app that automates manual processes that auditors have to perform in order to create examination results on a potential
examinee.  An examinee is a business that is requesting a loan of a certain amount of money from a bank so they bank hires an auditor
to create an exam that outputs the examinee's actual worth.  

AutoAudit generates and visualizes an Accounts Receivable audit for examinees. By using SheetJs, RegEx, and fuzzyset.js hundreds of accounts receivables can be identified as foreign, governmental, inter-company or expired and thus eliminated from an examinee's total Accounts Receivables. The data is then persisted to a PostgreSQL database backend and presented to the user using a Fluent UI frontend along with NIVO visualization tools.

You can view AutoAudit in action at https://autoauditapp.herokuapp.com/
