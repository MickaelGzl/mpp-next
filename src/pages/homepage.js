import { User } from 'db/sequelize';
import { withSessionSsr } from "@/session/withSession";
import Homepage from '../components/Homepage/Homepage';

export default function(props) {
  return <Homepage id={props.id} avatar={props.avatar}/>;
}


export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const sessionUser = req.session.user;

    const user = await User.findByPk(sessionUser.id);
    const id = user.id;
    const avatar = user.avatar;
    if(avatar){
      return {
        props: { id, avatar: avatar.toJSON()},
      };
    }
    else{
      return {
        props: { id, avatar: avatar},
      };
    }
  }
)