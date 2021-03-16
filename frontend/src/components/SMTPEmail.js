const SMTPEmail = () => {
    const sendEmail = () => {
        window.Email.send({
            SecureToken: "326f82ea-93ee-4d69-9536-306ca9140662",
            To: 'askachova@gmail.com',
            From: "skaann.dev@gmail.com",
            Subject: "SMTP Test Email",
            Body: "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>"
        }).then(
            message => alert("mail sent successfully")
        );
    }

    return (
        <>
            <input type="button" value="Send Email" onClick={sendEmail} />
        </>
    );
};

export default SMTPEmail
