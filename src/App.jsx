import axios from "axios";
import { useState } from "react"

function App() {
  const [account, setAccount] = useState({
    username: "",
    password: ""
  })
  const [isAuth , setIsAuth] = useState(false)
  const [tempProduct, setTempProduct] = useState({});
  const [productlist, setProductlist] = useState([]);

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setAccount({
      ...account,
      [name]: value
    })
  }

  const handleLogin = (e)=>{
    e.preventDefault();
    console.log('Login')
    axios.post(`${import.meta.env.VITE_BASE_URL}/v2/admin/signin`,account)
    .then((res) =>{
      const {token, expired} = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
    })
    .catch((error) => {alert('登入失敗')})
    setIsAuth(true)

  }

  return (
    <>
    {isAuth ? (<div className="container mt-5">
            <div className="row">
              <div className="col-6">
                <h2>產品列表</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">產品名稱</th>
                      <th scope="col">原價</th>
                      <th scope="col">售價</th>
                      <th scope="col">是否啟用</th>
                      <th scope="col">查看細節</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productlist.map((product) => (
                      <tr key={product.id}>
                        <th scope="row">{product.title}</th>
                        <td>{product.origin_price}</td>
                        <td>{product.price}</td>
                        <td>{product.is_enabled}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setTempProduct(product);
                            }}
                          >
                            查看細節
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-6">
                <h2>單一產品細節</h2>
                {tempProduct.title ? (
                  <div className="card">
                    <img src={tempProduct.imageUrl} className="card-img-top" alt="" />
                    <div className="card-body">
                      <h5 className="card-title">
                        {tempProduct.title}
                        <span className="badge text-bg-primary">{tempProduct.category}</span>
                      </h5>
                      <p className="card-text">{tempProduct.description}</p>
                      <p className="card-text">{tempProduct.content}</p>
                      <p className="card-text">
                        <del>{tempProduct.origin_price}</del>元 / {tempProduct.price}元
                      </p>
                      <h5 className="card-title">更多圖片</h5>
                      {tempProduct.imagesUrl?.map((image, index) => {
                        return <img className="img-fluid" src={image} key={index} />;
                      })}
                    </div>
                  </div>
                ) : (
                  <p>請選擇一個商品查看</p>
                )}
              </div>
            </div>
          </div>):(
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">請先登入</h1>
        <form className="d-flex flex-column gap-3" onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input name="username" value={account.username} onChange={handleInputChange} type="email" className="form-control" id="username" placeholder="name@example.com" />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input name="password" value={account.password} onChange={handleInputChange} type="password" className="form-control" id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary">登入</button>
        </form>
        <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
      </div>)}
    </>
  )
}

export default App
